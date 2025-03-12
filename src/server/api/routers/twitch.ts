import twitch from "~/server/twitch";
import { authedProcedure, createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { type TwitchUser } from "../types/twitch";
import db from "~/server/db";
import { RecordId } from "surrealdb"
import { type Vtuber } from "../schemas/vtuber";
import { currentUser, clerkClient } from '@clerk/nextjs/server'



export const twitchRouter = createTRPCRouter({
  users: publicProcedure.query(async () => {
    const response = await twitch.get<{ data: TwitchUser[] }>("/users", {
      params: {
        login: "neonkuroasa"
      }
    })

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return response.data
  }),
  streams: publicProcedure.query(async () => {
    const response = await twitch.get("/streams", {
      params: {
        language: "fr"
      }
    })

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return response.data
  }),
  importUser: authedProcedure.input(z.object({
    login: z.string()
  })).mutation(async ({ input, ctx: { user } }) => {

    const response = await twitch.get<{ data: TwitchUser[] }>("/users", {
      params: {
        login: input.login
      }
    })

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data = response.data.data[0];


    if (!data) {
      throw new Error(`twitch user with id ${input.login} not found`)
    }


    const vtuber = await db.create<Vtuber, Omit<Vtuber, "id">>(new RecordId("vtuber", data.login), {
      twitch_id: data.id,
      twitch_login: data.login,
      display_name: data.display_name,
      profile_image_url: data.profile_image_url,
      createdAt: new Date(),
    });

    const clerk = await clerkClient()
    await clerk.users.updateUserMetadata(user.id, {
      publicMetadata: {
        has_imported_channel: true
      }
    })

    return vtuber

  })
})
