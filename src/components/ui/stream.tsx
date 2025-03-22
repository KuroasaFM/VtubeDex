"use client";
import { CircleIcon, DotIcon, UserIcon, Gamepad2Icon, LucideHandHelping } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type MouseEvent } from "react";
import { type Stream } from "~/server/api/schemas/stream";

export default function Stream({ data }: { data: Stream }) {

  const preview = useRef<HTMLDivElement>(null);

  const [x, setX] = useState("");
  const [y, setY] = useState("");
  const [light, setLight] = useState("50");
  const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;
  const animatePreview = (event: MouseEvent) => {

    if (!preview.current) return;

    const bounds = preview.current?.getBoundingClientRect();
    if (!bounds) throw new Error("NO BOUNDS");
    const y = lerp(5, -5, (event.clientY - bounds.top) / bounds.height).toFixed(1);
    const light = lerp(60, 40, (event.clientY - bounds.top) / bounds.height).toFixed(1);
    const x = lerp(-3, 3, (event.clientX - bounds.left) / bounds.width).toFixed(1);
    setX(x)
    setY(y)
    setLight(light)
  }

  const leave = () => {
    setX("0")
    setY("0")
    setLight("50")
  }

  if (!data) return;

  return <Link className="flex flex-col relative group bg-neutral-900/50 backdrop-blur-lg rounded-lg cursor-pointer" href={`https://twitch.tv/${data.user_login}`}>
    <div className="aspect-video absolute w-full z-20" onMouseMove={animatePreview} onMouseLeave={leave} />

    <div ref={preview} className="aspect-video w-full transform-gpu transform-3d perspective-midrange perspective-origin-center group-hover:scale-105 transition-all ease-out" >
      <div style={{ transform: `rotateX(${y}deg) rotateY(${x}deg)` }} className=
        "rotate-z-0 aspect-video relative  overflow-hidden cursor-pointer drop-shadow-md group-hover:drop-shadow-xl rounded-lg before:rounded-lg before:z-10 before:bg-transparent before:absolute before:h-full before:w-full before:block before-rounded-lg before:inset-shadow-sm before:inset-shadow-neutral-50/50 before:mix-blend-lighten before:ring before:ring-neutral-50/10 before:inset-ring-neutral-50 before:shadow-inner"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <div className="h-full w-full mix-blend-overlay absolute" style={{ backgroundColor: `hsl(0,0%,${light}%)` }} />
        <Image priority className="-z-1" src={data.thumbnail_url.replace("{width}", "1280").replace("{height}", "720")} alt="" width={1280} height={720} />
        <div className="flex z-20 absolute top-2 left-2 gap-2">
          <div className="translate-z-20 px-3 py-2 rounded-md backdrop-blur-xs bg-neutral-800/55 text-xs flex gap-1 items-center text-neutral-200/50 group-hover:text-neutral-200 transition-all ease-in-out">
            <CircleIcon className="text-red-500" height={10} width={10} fill="red" />
            <span className="font-bold">{data.length}</span>
            <DotIcon height={10} width={10} className="text-neutral-600" />
            <span className="">{data.viewer_count}</span>
            <UserIcon className="group-hover:text-neutral-400 transition-all ease-in-out" height={10} width={10} />
          </div>
        </div>
        <div className="flex z-20 absolute bottom-2 left-2 gap-2">
          <div className="bg-neutral-800/55 flex backdrop-blur-xs rounded-md items-center text-neutral-300">
            <div className="bg-neutral-800/55  p-2 rounded-md">
              <Gamepad2Icon height={16} width={16} className="" />
            </div>
            <span className="text-xs px-2 font-display italic font-bold tracking-tighter truncate ">{data.game_name}</span>
          </div>
        </div>
        <div className="z-5 w-full h-1/6 bg-gradient-to-t from-transparent to-white/50 absolute top-0 left-0 mix-blend-overlay" />
        <div className="z-5 w-full h-1/6  bg-gradient-to-b from-transparent to-black/50 absolute bottom-0 left-0 mix-blend-multiply" />
        <div className="z-5 w-full h-3  bg-gradient-to-b from-transparent to-black/50 absolute bottom-0 left-0 mix-blend-multiply" />
      </div>
    </div>
    <div className="flex z-10 flex-col w-full items-stretch box-border p-3">
      <span className="tracking-tighter text-sm font-bold text-neutral-200">{data.user_name}</span>
      <span className="truncate text-xs text-neutral-500 ">{data.title}</span>
    </div>
  </Link>
}
