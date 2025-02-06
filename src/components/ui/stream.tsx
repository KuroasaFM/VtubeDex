"use client";
import { CircleIcon, DotIcon, UserIcon, Gamepad2Icon } from "lucide-react";
import Image from "next/image";
import { useRef, useState, type MouseEvent } from "react";
import { cn } from "~/lib/utils";
import { type Stream } from "~/server/api/schemas/stream";

export default function Stream({ data }: { data: Stream }) {

  const preview = useRef<HTMLDivElement>(null);

  const [x, setX] = useState("");
  const [y, setY] = useState("");
  const lerp = (x, y, a) => x * (1 - a) + y * a;
  const animatePreview = (event: MouseEvent) => {

    if (!preview.current) return;

    const bounds = preview.current?.getBoundingClientRect();
    if (!bounds) throw new Error("NO BOUNDS");
    const y = lerp(10, -10, (event.clientY - bounds.top) / bounds.height).toFixed(0);
    const x = lerp(-7, 7, (event.clientX - bounds.left) / bounds.width).toFixed(0);
    setX(x)
    setY(y)

  }

  const leave = () => {
    setX("0")
    setY("0")
  }

  return <div className="flex flex-col group bg-neutral-900 rounded-lg cursor-pointer transform-gpu transform-3d perspective-midrange perspective-origin-center">
    <div ref={preview} style={{ transform: `rotateX(${y}deg) rotateY(${x}deg)` }} onMouseMove={animatePreview} onMouseLeave={leave} className=
      "rotate-z-0 aspect-video relative group-hover:translate-z-10  overflow-hidden cursor-pointer drop-shadow-md group-hover:drop-shadow-xl rounded-lg before:rounded-lg before:z-10 before:bg-transparent before:absolute before:h-full before:w-full before:block before-rounded-lg before:inset-shadow-sm before:inset-shadow-neutral-50/50 before:mix-blend-lighten before:ring before:ring-neutral-50/10 before:inset-ring-neutral-50 before:shadow-inner"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <Image className="-z-1" src={data.thumbnail_url.replace("{width}", "1280").replace("{height}", "720")} alt="" width={1280} height={720} />
      <div className="flex z-20 absolute top-2 left-2 gap-2">
        <div className="translate-z-20 px-3 py-2 rounded-md backdrop-blur-xs bg-neutral-800/55 text-xs flex gap-1 items-center text-neutral-200/50 group-hover:text-neutral-200 transition-all ease-in-out">
          <CircleIcon className="text-red-500" height={10} width={10} fill="red" />
          <span className="font-bold">{data.length}</span>
          <DotIcon height={10} width={10} className="text-neutral-600" />
          <span className="">{data.viewer_count}</span>
          <UserIcon className="group-hover:text-neutral-400 transition-all ease-in-out" height={10} width={10} />
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
      <div className="z-5 w-full h-1/6 bg-gradient-to-t from-transparent to-white/50 absolute top-0 left-0 mix-blend-overlay" />
      <div className="z-5 w-full h-1/6  bg-gradient-to-b from-transparent to-black/50 absolute bottom-0 left-0 mix-blend-multiply" />
      <div className="z-5 w-full h-3  bg-gradient-to-b from-transparent to-black/50 absolute bottom-0 left-0 mix-blend-multiply" />
    </div>
    <div className="flex -z-10 flex-col w-full items-stretch box-border p-3">
      <span className="tracking-tighter text-sm font-bold text-neutral-200">{data.user_name}</span>
      <span className="truncate text-xs text-neutral-500 ">{data.title}</span>
    </div>
  </div>
}
