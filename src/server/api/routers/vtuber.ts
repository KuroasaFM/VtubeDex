import db from "~/server/db";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { type Vtuber } from "../schemas/vtuber";


export const vtuberRouter = createTRPCRouter({
  find: publicProcedure.query(async () => {
    const response = await db.select<Vtuber>("vtuber");
    return response;
  }),
})
