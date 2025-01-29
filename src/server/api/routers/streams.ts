import db from "~/server/db";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { type Vtuber } from "../schemas/vtuber";

import twitch from "~/server/twitch";
import { type TwitchStream } from "../types/twitch";
import { type Stream } from "../schemas/stream";

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
    const vtubers = await db.select<Vtuber>("vtuber");

    console.log(vtubers)
    const response = await twitch.get<{ data: TwitchStream[] }>("/streams", {
      params: {
        user_login: vtubers.map((vtuber) => vtuber.twitch_login)
      }
    })

    for (const stream of response.data.data) {
      await db.create<Stream>("streams", stream)
    }

    const streams = await db.select<Stream>("streams");

    return streams
  }),
})
