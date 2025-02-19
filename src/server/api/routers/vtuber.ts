import db from "~/server/db";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { type Vtuber } from "../schemas/vtuber";
import { z } from "zod";

import { RecordId } from "surrealdb"
import { currentUser } from "@clerk/nextjs/server";
import { type Follow } from "../schemas/follows";

export const vtuberRouter = createTRPCRouter({
  find: publicProcedure.query(async () => {
    const response = await db.select<Vtuber>("vtuber");
    return response;
  }),
  search: publicProcedure.input(z.object({
    search: z.string().optional()
  })).query(async ({ input }) => {
    const user = await currentUser();
    if (!user) return [];
    const [oshis] = await db.query<[string[]]>("SELECT value(follows) FROM follows WHERE user = $user", { user: user.username })
    const [vtubers] = await db.query<[Vtuber[]]>("SELECT *, $oshis CONTAINS twitch_login AS is_oshi from vtuber where string::matches(twitch_login,$search)", { search: input.search ?? "", oshis });
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
  setAsOshi: publicProcedure.input(z.object({ vtuber_login: z.string(), is_oshi: z.boolean() })).mutation(async ({ input }) => {
    const user = await currentUser();
    if (!user) return;

    if (input.is_oshi)
      await db.create("follows", { user: user.username, follows: input.vtuber_login })
    else
      await db.query("DELETE from follows where user = $user and follows = $follows", {
        user: user.username,
        follows: input.vtuber_login
      })
  })
})
