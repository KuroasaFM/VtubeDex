import db from "~/server/db";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { RecordId } from "surrealdb"

import twitch from "~/server/twitch";

import { type TwitchStream } from "../types/twitch";
import { type Stream } from "../schemas/stream";
import { type Vtuber } from "../schemas/vtuber";
import { api } from "~/trpc/server";
import { type State } from "../schemas/states";
import { z } from "zod";
import { currentUser } from "@clerk/nextjs/server";
import { type Follow } from "../schemas/follows";

export const streamsRouter = createTRPCRouter({
  updateStreamCache: publicProcedure.mutation(async () => {

    const { value: last_stream_cache_update } = await db.select<State>(new RecordId('states', 'last_stream_cache_update'));

    const last_stream_cache_update_as_date = Number(last_stream_cache_update);
    const now = new Date();


    if (now.valueOf() - last_stream_cache_update_as_date.valueOf() < 2 * 60 * 1000) return;
    await db.patch<State>(new RecordId('states', 'last_stream_cache_update'), [
      {
        op: "replace",
        path: "value",
        value: Date.now().toString()
      }
    ]);

    await db.delete("streams");
    const vtubers = await db.select<Vtuber>("vtuber");
    const streams: TwitchStream[] = []

    do {
      const vtubers_to_search = vtubers.splice(0, 100);
      const response = await twitch.get<{ data: TwitchStream[] }>("/streams", {
        params: {
          user_login: vtubers_to_search.map((vtuber) => vtuber.twitch_login)
        }
      })
      streams.push(...response.data.data);
    } while (vtubers.length > 1)

    for (const stream of streams) {
      await db.create<Stream>("streams", stream)
    }
  }),
  find: publicProcedure.input(z.object({
    limit: z.number().default(24), // 24 is divisible by 2, 3 and 4 = better ui when sorted by grid
  })).query(async ({ input }) => {

    await api.streams.updateStreamCache();

    let streams = await db.select<Stream>("streams");

    streams = streams.splice(0, input.limit);

    return streams.map(stream => {
      const date = Date.parse(stream.started_at);
      const stream_lenght_millis = Date.now() - date
      return {
        ...stream,
        length: msToTime(stream_lenght_millis)
      }
    }).sort((a, b) => Date.parse(a.started_at) > Date.parse(b.started_at) ? -1 : 1);

  }),
  findFavourites: publicProcedure.input(z.object({
    limit: z.number().default(24), // 24 is divisible by 2, 3 and 4 = better ui when sorted by grid
  })).query(async ({ input }) => {
    const user = await currentUser();

    if (!user) throw new Error("User not connected");

    await api.streams.updateStreamCache();
    const [follows]: Follow[][] = await db.query('SELECT follows FROM follows WHERE user == $username', { username: user.username })


    if (!follows) return [];

    console.log(follows.map(follow => follow.follows))
    let streams = await db.select<Stream>("streams");


    streams = streams.filter((stream) => follows.map(follow => follow.follows).includes(stream.user_login)).splice(0, input.limit);

    return streams.map(stream => {
      const date = Date.parse(stream.started_at);
      const stream_lenght_millis = Date.now() - date
      return {
        ...stream,
        length: msToTime(stream_lenght_millis)
      }
    }).sort((a, b) => Date.parse(a.started_at) > Date.parse(b.started_at) ? -1 : 1);

  }),
})

function msToTime(duration: number) {
  const minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  const hours_str = (hours < 10) ? "0" + hours : hours;
  const minutes_str = (minutes < 10) ? "0" + minutes : minutes;

  return hours_str + ":" + minutes_str;
}
