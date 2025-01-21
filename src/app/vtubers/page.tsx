"use client";
import { api } from "~/trpc/react"
import Image from "next/image";

export default function Vtubers() {

  const { data: vtubers, isSuccess } = api.vtuber.find.useQuery();

  return <div className="p-8 2xl:w-2/3 w-full mx-auto">
    <h1 className="font-display font-bold italic tracking-tighter text-2xl mb-8 ">Vtubers </h1>
    {!!isSuccess && <div>
      {vtubers.map(vtuber => <div className="odd:bg-neutral-900/50 p-4 flex gap-4 items-center hover:bg-neutral-900 transition-all" key={vtuber.id}>
        <div>
          <div className="h-8 w-8 rounded-full bg-neutral-900 overflow-hidden border-2 border-white/15">
            <Image src={vtuber.profile_image_url} height={200} width={200} alt={vtuber.twitch_login}></Image>
          </div>
        </div>
        <span className="font-bold select-none text-sm">{vtuber.display_name}</span>
      </div>)}
    </div>}
  </div>
}
