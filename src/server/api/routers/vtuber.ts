import db from "~/server/db";
import { authedProcedure, createTRPCRouter, publicProcedure } from "../trpc";
import { type Vtuber } from "../schemas/vtuber";
import { z } from "zod";

import { currentUser } from "@clerk/nextjs/server";
import { RecordId } from "surrealdb";

export const vtuberRouter = createTRPCRouter({
  find: publicProcedure.query(async () => {
    const vtubers = await db.select<Vtuber>("vtuber");
    return vtubers;

  }),
  search: publicProcedure.input(z.object({
    search: z.string().optional()
  })).query(async ({ input }) => {
    const user = await currentUser();
    if (!user) {

      const [vtubers] = await db.query<[Vtuber[]]>("SELECT * from vtuber where string::matches(twitch_login,$search) and isHidden != true", { search: input.search ?? "" });
      return vtubers;
    }
    const [oshis] = await db.query<[string[]]>("SELECT value(follows) FROM follows WHERE user = $user", { user: user.username })
    const [vtubers] = await db.query<[Vtuber[]]>("SELECT *, $oshis CONTAINS twitch_login AS is_oshi from vtuber where string::matches(twitch_login,$search) and isHidden != true", { search: input.search ?? "", oshis });
    return vtubers;
  }),
  findOne: publicProcedure.input(z.object({ login: z.string() })).query(async ({ input }) => {
    const response = await db.query<Vtuber[][]>("SELECT * FROM vtuber WHERE twitch_login = $login", { login: input.login });
    if (!response[0]?.[0]) {
      throw new Error(`No Vtuber found for login ${input.login}`)
    }
    return response[0][0];
  }),
  findOshis: authedProcedure.query(async ({ ctx: { user } }) => {
    const [follows] = await db.query<[string[]]>("SELECT value(follows) FROM follows WHERE user = $user", { user: user.username })

    const [oshis] = await db.query<[Vtuber[]]>(`SELECT * FROM vtuber WHERE $oshis CONTAINS twitch_login and isHidden != true`, { oshis: follows })

    return oshis;
  }),
  findAllWithOshis: authedProcedure.query(async ({ ctx: { user } }) => {

    const [follows] = await db.query<[string[]]>("SELECT value(follows) FROM follows WHERE user = $user", { user: user.username })

    const [oshis] = await db.query<[(Vtuber & { is_oshi?: boolean })[]]>(`SELECT *, $oshis CONTAINS twitch_login AS is_oshi FROM vtuber where isHidden != true`, { oshis: follows })

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
    return vtuber;
  }),
  setAsOshi: authedProcedure.input(z.object({ vtuber_login: z.string(), is_oshi: z.boolean() })).mutation(async ({ input, ctx: { user } }) => {
    if (input.is_oshi)
      await db.create("follows", { user: user.username, follows: input.vtuber_login })
    else
      await db.query("DELETE from follows where user = $user and follows = $follows", {
        user: user.username,
        follows: input.vtuber_login
      })
  })
})
