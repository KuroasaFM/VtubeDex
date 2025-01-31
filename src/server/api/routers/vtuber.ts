import db from "~/server/db";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { type Vtuber } from "../schemas/vtuber";
import { z } from "zod";

import { RecordId } from "surrealdb"

export const vtuberRouter = createTRPCRouter({
  find: publicProcedure.query(async () => {
    const response = await db.select<Vtuber>("vtuber");
    return response;
  }),
  findOne: publicProcedure.input(z.object({ login: z.string() })).query(async ({ input }) => {
    const response = await db.query<Vtuber[][]>("SELECT * FROM vtuber WHERE twitch_login = $login", { login: input.login });
    if (!response[0]?.[0]) {
      throw new Error(`No Vtuber found for login ${input.login}`)
    }
    return response[0][0];
  }),
  setHidden: publicProcedure.input(z.object({ login: z.string(), isHidden: z.boolean() })).mutation(async ({ input }) => {
    const vtuber = await db.patch<Vtuber>(new RecordId("vtuber", input.login), [
      {
        op: "replace",
        path: "isHidden",
        value: input.isHidden
      }
    ]);

    console.log(vtuber)
    return vtuber;
  }),
})
