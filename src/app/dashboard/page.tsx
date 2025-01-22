"use client";

import { useUser } from "@clerk/nextjs";
import { TvIcon, TvMinimalIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { type Vtuber } from "~/server/api/schemas/vtuber";
import { api } from "~/trpc/react";
import Image from "next/image";

export default function DashboardHome() {
  const { user } = useUser();

  const [vtuber, setVtuber] = useState<Vtuber>();

  const { data } = api.vtuber.findOne.useQuery({ login: user?.username ?? "" });

  useEffect(() => {
    setVtuber(data);
  }, [data])

  return <div className="h-full w-full p-8 flex flex-col gap-8">
    <h1 className="font-display font-bold italic text-4xl">Dashboard</h1>
    {
      !user?.publicMetadata.has_imported_channel &&
      <div className="rounded-lg border border-purple-800 bg-gradient-to-bl flex items-center to-neutral-950 from-purple-500/50 p-4">
        <span>Importez votre chaine twitch !</span>
        <div className="grow" />
        <Link href={"/dashboard/channel"}>
          <Button className="self-end">Importer ma chaine</Button>
        </Link>
      </div>
    }
    {
      !!user?.publicMetadata.has_imported_channel &&
      <div className="rounded-lg bg-neutral-900 flex items-center gap-4 p-4">
        <div className="h-8 w-8 rounded-full bg-neutral-900 overflow-hidden border-2 border-white/15">
          {vtuber && <Image src={vtuber.profile_image_url} height={200} width={200} alt={vtuber.twitch_login}></Image>}
        </div>
        <span className="flex gap-1 items-center">
          <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2400 2800"><path fill="#fff" d="m2200 1300-400 400h-400l-350 350v-350H600V200h1600z" /><g fill="#9146ff"><path d="M500 0 0 500v1800h600v500l500-500h400l900-900V0H500zm1700 1300-400 400h-400l-350 350v-350H600V200h1600v1100z" /><path d="M1700 550h200v600h-200zm-550 0h200v600h-200z" /></g></svg>
          {vtuber?.display_name}
        </span>
        <div className="grow" />
        <Link href={"/dashboard/channel"}>
          <Button className="self-end" variant={'secondary'}><TvIcon /> Ma Chaine</Button>
        </Link>
      </div>
    }

    <div>
      <div className="grid grid-cols-2 gap-8">
        <div className="aspect-video border-2 border-dotted rounded-lg"></div>
        <div className="aspect-video border-2 border-dotted rounded-lg"></div>
        <div className="aspect-video border-2 border-dotted rounded-lg"></div>
        <div className="aspect-video border-2 border-dotted rounded-lg"></div>
        <div className="aspect-video border-2 border-dotted rounded-lg"></div>
      </div>
    </div>
  </div>
}
