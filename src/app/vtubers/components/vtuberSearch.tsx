"use client";

import { SquareArrowOutUpRightIcon, StarsIcon, } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Input } from "~/components/ui/input";
import { type Vtuber } from "~/server/api/schemas/vtuber";
import { api } from "~/trpc/react"

interface VtuberSearchProps {
  vtubers: (Vtuber & { is_oshi?: boolean })[]
}

export default function VtuberSearch(props: VtuberSearchProps) {

  const [search, setSearch] = useState("")
  const [vtubers, setVtubers] = useState(props.vtubers)

  const { data, refetch: refetchVtubers } = api.vtuber.search.useQuery({ search: search });
  const { mutate: setAsOshi } = api.vtuber.setAsOshi.useMutation();

  const setVtuberAsOshi = async (vtuber: Vtuber & { is_oshi?: boolean }) => {
    const { twitch_login: vtuber_login, is_oshi } = vtuber;
    setAsOshi({
      vtuber_login,
      is_oshi: !is_oshi
    });

    await refetchVtubers();
  }

  useEffect(() => {
    if (data) setVtubers(data);
  }, [data])

  return <div className="flex flex-col gap-4">
    <div>
      <Input onInput={(e) => setSearch(e.currentTarget.value)} className="focus-visible:ring-transparent focus-visible:border-neutral-700" />
    </div>
    <div className="rounded-lg overflow-hidden">
      {vtubers.map(vtuber => <div className="odd:bg-neutral-900/50 p-4 flex gap-4 items-center hover:bg-neutral-900 transition-all" key={JSON.stringify(vtuber.id)}>
        <div>
          <div className="h-8 w-8 rounded-full bg-neutral-900 overflow-hidden border-2 border-white/15">
            {/* <Image src={vtuber.profile_image_url || null} height={200} width={200} alt={vtuber.twitch_login}></Image> */}
          </div>
        </div>
        <span className="font-bold select-none text-sm">{vtuber.display_name || vtuber.twitch_login}</span>
        <div className=" text-neutral-700 group hover:text-neutral-600 hover:underline flex gap-1">
          <SquareArrowOutUpRightIcon size={16} />
          <Link href={`https://twitch.tv/${vtuber.twitch_login}`} className="text-xs">ttv/{vtuber.twitch_login}</Link>

        </div>
        <div className="grow" />
        <div className="hover:bg-neutral-800 p-2 rounded-lg cursor-pointer" onClick={() => setVtuberAsOshi(vtuber)}>
          {!vtuber.is_oshi && <StarsIcon strokeWidth={1} size={20} />}
          {!!vtuber.is_oshi && <StarsIcon strokeWidth={2} fill="white" size={20} />}
        </div>
      </div>)}
    </div>
  </div>
}
