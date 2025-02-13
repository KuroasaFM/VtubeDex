import { currentUser } from "@clerk/nextjs/server";
import { StarsIcon } from "lucide-react";
import Image from "next/image";
import { type Vtuber } from "~/server/api/schemas/vtuber";
import { api } from "~/trpc/server";

export default async function Vtubers() {

  const user = await currentUser();

  let vtubers: (Vtuber & { is_oshi?: boolean })[];

  if (user) {
    vtubers = await api.vtuber.findAllWithOshis();
  }
  else {
    vtubers = await api.vtuber.find();
  }

  return <div className="p-8 2xl:w-2/3 w-full mx-auto">
    <h1 className="font-display font-bold italic tracking-tighter text-2xl mb-8 ">Vtubers </h1>
    <div>
      {vtubers.map(vtuber => <div className="odd:bg-neutral-900/50 p-4 flex gap-4 items-center hover:bg-neutral-900 transition-all" key={vtuber.id.toString()}>
        <div>
          <div className="h-8 w-8 rounded-full bg-neutral-900 overflow-hidden border-2 border-white/15">
            {/* <Image src={vtuber.profile_image_url || null} height={200} width={200} alt={vtuber.twitch_login}></Image> */}
          </div>
        </div>
        <span className="font-bold select-none text-sm">{vtuber.display_name || vtuber.twitch_login}</span>
        <div className="grow" />
        <span>
          {!vtuber.is_oshi && <StarsIcon strokeWidth={1} size={24} />}
          {!!vtuber.is_oshi && <StarsIcon strokeWidth={2} fill="white" size={24} />}
        </span>
      </div>)}
    </div>
  </div>
}
