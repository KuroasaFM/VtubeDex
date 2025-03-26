import db from "~/server/db";
import { authedProcedure, createTRPCRouter, publicProcedure } from "../trpc";
import { type Stream } from "../schemas/stream";
import { z } from "zod";
import { currentUser } from "@clerk/nextjs/server";
import { type Follow } from "../schemas/follows";
import twitch from "~/server/twitch";
import { type State } from "../schemas/states";
import { type Vtuber } from "../schemas/vtuber";
import { type TwitchStream } from "../types/twitch";
import { jsonify, RecordId } from "surrealdb";

const updateStreamCache = async () => {
  const response = await db.select<State>(
    new RecordId("states", "last_stream_cache_update"),
  );

  if (response) {
    const last_stream_cache_update = response.value;
    const last_stream_cache_update_as_date = Number(last_stream_cache_update);
    const now = new Date();
    if (
      now.valueOf() - last_stream_cache_update_as_date.valueOf() <
      2 * 60 * 1000
    )
      return;
  }

  await db.patch<State>(new RecordId("states", "last_stream_cache_update"), [
    {
      op: "replace",
      path: "value",
      value: Date.now().toString(),
    },
  ]);

  await db.delete("streams");
  const vtubers = await db.select<Vtuber>("vtuber");

  const streams: TwitchStream[] = [];

  do {
    const vtubers_to_search = vtubers.splice(0, 100);
    const response = await twitch.get<{ data: TwitchStream[] }>("/streams", {
      params: {
        user_login: vtubers_to_search.map((vtuber) => vtuber.twitch_login),
      },
    });
    streams.push(...response.data.data);
  } while (vtubers.length > 1);

  for (const stream of streams) {
    // TODO: Y'a probablement plus efficace que ça a faire
    await db.create<Stream>("streams", stream);
  }
};

export const streamsRouter = createTRPCRouter({
  // updateStreamCache: publicProcedure.mutation(updateStreamCache),
  find: publicProcedure
    .input(
      z.object({
        limit: z.number().default(24), // 24 is divisible by 2, 3 and 4 = better ui when sorted by grid
      }),
    )
    .query(async ({ input }) => {
      await updateStreamCache();

      let streams = await db.select<Stream>("streams");

      streams = streams.splice(0, input.limit);

      return streams
        .map((stream) => {
          const date = Date.parse(stream.started_at);
          const stream_lenght_millis = Date.now() - date;
          return {
            ...stream,
            length: msToTime(stream_lenght_millis),
          };
        })
        .sort((a, b) =>
          Date.parse(a.started_at) > Date.parse(b.started_at) ? -1 : 1,
        );
    }),
  findFavourites: authedProcedure
    .input(
      z.object({
        limit: z.number().default(24), // 24 is divisible by 2, 3 and 4 = better ui when sorted by grid
      }),
    )
    .query(async ({ input, ctx: { user } }) => {
      await updateStreamCache();
      const [follows]: Follow[][] = await db.query(
        "SELECT follows FROM follows WHERE user == $username",
        { username: user.username },
      );

      if (!follows) return [];

      console.log(follows.map((follow) => follow.follows));
      let streams = await db.select<Stream>("streams");

      streams = streams
        .filter((stream) =>
          follows.map((follow) => follow.follows).includes(stream.user_login),
        )
        .splice(0, input.limit);

      return streams
        .map((stream) => {
          const date = Date.parse(stream.started_at);
          const stream_lenght_millis = Date.now() - date;
          return {
            ...stream,
            length: msToTime(stream_lenght_millis),
          };
        })
        .sort((a, b) =>
          Date.parse(a.started_at) > Date.parse(b.started_at) ? -1 : 1,
        );
    }),
});

function msToTime(duration: number) {
  const minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  const hours_str = hours < 10 ? "0" + hours : hours;
  const minutes_str = minutes < 10 ? "0" + minutes : minutes;

  return hours_str + ":" + minutes_str;
}
