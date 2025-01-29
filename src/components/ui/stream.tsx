import { CircleIcon, DotIcon, UserIcon, Gamepad2Icon } from "lucide-react";
import { type Stream } from "~/server/api/schemas/stream";

export default function Stream({ data }: { data: Stream }) {

  return <div className="flex flex-col group bg-neutral-900 rounded-lg cursor-pointer ">
    <div className="aspect-video relative group-hover:scale-105 transition-all ease-in-out overflow-hidden cursor-pointer drop-shadow-md group-hover:drop-shadow-xl rounded-lg before:rounded-lg before:z-10 before:bg-transparent before:absolute before:h-full before:w-full before:block before-rounded-lg before:inset-shadow-sm before:inset-shadow-neutral-50/50 before:mix-blend-lighten before:ring before:ring-neutral-50/10 before:inset-ring-neutral-50 before:shadow-inner ">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="-z-1" src={data.thumbnail_url.replace("{width}", "1280").replace("{height}", "720")} alt="" />
      <div className="flex z-20 absolute top-2 left-2 gap-2">
        <div className=" px-3 py-2 rounded-md backdrop-blur-xs bg-neutral-500/20 text-xs flex gap-1 items-center text-neutral-200/50 group-hover:text-neutral-200 transition-all ease-in-out">
          <CircleIcon className="text-red-500" height={10} width={10} fill="red" />
          <span className="font-bold">00:13</span>
          <DotIcon height={10} width={10} className="text-neutral-600" />
          <span className="">{data.viewer_count}</span>
          <UserIcon className="text-neutral-600 group-hover:text-neutral-400 transition-all ease-in-out" height={10} width={10} />
        </div>
      </div>
      <div className="flex z-20 absolute bottom-2 left-2 gap-2 ">
        <div className="bg-neutral-800/55 flex backdrop-blur-xs rounded-md items-center text-neutral-300">
          <div className="bg-neutral-800/55  p-2 rounded-md">
            <Gamepad2Icon height={16} width={16} className="" />
          </div>
          <span className="text-xs px-2 font-display italic font-bold tracking-tighter">{data.game_name}</span>
        </div>
      </div>
    </div>
    <div className="flex flex-col w-full items-stretch box-border p-2 pt-2">
      <span className="tracking-tighter text-xs font-bold text-neutral-200">{data.user_name}</span>
      <span className="truncate text-xs text-neutral-500 ">{data.title}</span>
    </div>
  </div>
}
