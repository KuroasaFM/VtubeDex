import db from "~/server/db";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { type Vtuber } from "../schemas/vtuber";
import { z } from "zod";

import { RecordId } from "surrealdb"
import { currentUser } from "@clerk/nextjs/server";

export const vtuberRouter = createTRPCRouter({
  find: publicProcedure.query(async () => {
    const response = await db.select<Vtuber>("vtuber");
    return response;
  }),
  search: publicProcedure.input(z.object({
    search: z.string().optional()
  })).query(async ({ input }) => {
    const [vtubers] = await db.query<[Vtuber[]]>("SELECT * from vtuber where string::matches(twitch_login,$search)", { search: input.search ?? "" });
    console.log(vtubers)
    return vtubers;
  }),
  findOne: publicProcedure.input(z.object({ login: z.string() })).query(async ({ input }) => {
    const response = await db.query<Vtuber[][]>("SELECT * FROM vtuber WHERE twitch_login = $login", { login: input.login });
    if (!response[0]?.[0]) {
      throw new Error(`No Vtuber found for login ${input.login}`)
    }
    return response[0][0];
  }),
  findOshis: publicProcedure.query(async () => {
    const user = await currentUser();
    if (!user) return [];

    const [follows] = await db.query<[string[]]>("SELECT value(follows) FROM follows WHERE user = $user", { user: user.username })

    const [oshis] = await db.query<[Vtuber[]]>(`SELECT * FROM vtuber WHERE $oshis CONTAINS twitch_login`, { oshis: follows })

    return oshis;
  }),
  findAllWithOshis: publicProcedure.query(async () => {
    const user = await currentUser();
    if (!user) return [];

    const [follows] = await db.query<[string[]]>("SELECT value(follows) FROM follows WHERE user = $user", { user: user.username })

    const [oshis] = await db.query<[(Vtuber & { is_oshi?: boolean })[]]>(`SELECT *, $oshis CONTAINS twitch_login AS is_oshi FROM vtuber`, { oshis: follows })

    return oshis;
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
