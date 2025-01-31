import db from "~/server/db";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { RecordId } from "surrealdb"

import twitch from "~/server/twitch";

import { type TwitchStream } from "../types/twitch";
import { type Stream } from "../schemas/stream";
import { type Vtuber } from "../schemas/vtuber";

export const streamsRouter = createTRPCRouter({
  updateStreamCache: publicProcedure.mutation(async () => {
    const vtubers = await db.select<Vtuber>("vtuber");

    const response = await twitch.get<{ data: TwitchStream[] }>("/streams", {
      params: {
        login: vtubers.map((vtuber) => vtuber.twitch_login)
      }
    })

    for (const stream of response.data.data) {
      await db.create<Stream>("streams", stream)
    }
  }),
  find: publicProcedure.query(async () => {
    await db.delete("streams");

    await db.update(new RecordId("states", "last_stream_cache_update"), { value: Date.now().toString() })

    const vtubers = await db.select<Vtuber>("vtuber");

    console.log(vtubers)
    const response = await twitch.get<{ data: TwitchStream[] }>("/streams", {
      params: {
        user_login: vtubers.filter((vtuber) => !vtuber.isHidden).map((vtuber) => vtuber.twitch_login)
      }
    })

    for (const stream of response.data.data) {
      console.log(stream);
      await db.create<Stream>("streams", stream)
    }

    const streams = await db.select<Stream>("streams");

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
