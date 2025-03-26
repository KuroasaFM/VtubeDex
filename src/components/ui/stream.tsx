"use client";
import { CircleIcon, DotIcon, UserIcon, Gamepad2Icon } from "lucide-react";
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
    const y = lerp(5, -5, (event.clientY - bounds.top) / bounds.height).toFixed(
      1,
    );
    const light = lerp(
      60,
      40,
      (event.clientY - bounds.top) / bounds.height,
    ).toFixed(1);
    const x = lerp(-3, 3, (event.clientX - bounds.left) / bounds.width).toFixed(
      1,
    );
    setX(x);
    setY(y);
    setLight(light);
  };

  const leave = () => {
    setX("0");
    setY("0");
    setLight("50");
  };

  if (!data) return;

  return (
    <Link
      className="group relative flex cursor-pointer flex-col rounded-lg bg-neutral-900/50 backdrop-blur-lg"
      href={`https://twitch.tv/${data.user_login}`}
    >
      <div
        className="absolute z-20 aspect-video w-full"
        onMouseMove={animatePreview}
        onMouseLeave={leave}
      />

      <div
        ref={preview}
        className="aspect-video w-full transform-gpu transition-all ease-out perspective-midrange perspective-origin-center transform-3d group-hover:scale-105"
      >
        <div
          style={{ transform: `rotateX(${y}deg) rotateY(${x}deg)` }}
          className="before-rounded-lg relative aspect-video rotate-z-0 cursor-pointer overflow-hidden rounded-lg drop-shadow-md group-hover:drop-shadow-xl before:absolute before:z-10 before:block before:h-full before:w-full before:rounded-lg before:bg-transparent before:mix-blend-lighten before:shadow-inner before:ring before:inset-shadow-sm before:ring-neutral-50/10 before:inset-shadow-neutral-50/50 before:inset-ring-neutral-50"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <div
            className="absolute h-full w-full mix-blend-overlay"
            style={{ backgroundColor: `hsl(0,0%,${light}%)` }}
          />
          <Image
            priority
            className="-z-1"
            src={data.thumbnail_url
              .replace("{width}", "1280")
              .replace("{height}", "720")}
            alt=""
            width={1280}
            height={720}
          />
          <div className="absolute top-2 left-2 z-20 flex gap-2">
            <div className="flex translate-z-20 items-center gap-1 rounded-md bg-neutral-800/55 px-3 py-2 text-xs text-neutral-200/50 backdrop-blur-xs transition-all ease-in-out group-hover:text-neutral-200">
              <CircleIcon
                className="text-red-500"
                height={10}
                width={10}
                fill="red"
              />
              <span className="font-bold">{data.length}</span>
              <DotIcon height={10} width={10} className="text-neutral-600" />
              <span className="">{data.viewer_count}</span>
              <UserIcon
                className="transition-all ease-in-out group-hover:text-neutral-400"
                height={10}
                width={10}
              />
            </div>
          </div>
          <div className="absolute bottom-2 left-2 z-20 flex gap-2">
            <div className="flex items-center rounded-md bg-neutral-800/55 text-neutral-300 backdrop-blur-xs">
              <div className="rounded-md bg-neutral-800/55 p-2">
                <Gamepad2Icon height={16} width={16} className="" />
              </div>
              <span className="font-display truncate px-2 text-xs font-bold tracking-tighter italic">
                {data.game_name}
              </span>
            </div>
          </div>
          <div className="absolute top-0 left-0 z-5 h-1/6 w-full bg-gradient-to-t from-transparent to-white/50 mix-blend-overlay" />
          <div className="absolute bottom-0 left-0 z-5 h-1/6 w-full bg-gradient-to-b from-transparent to-black/50 mix-blend-multiply" />
          <div className="absolute bottom-0 left-0 z-5 h-3 w-full bg-gradient-to-b from-transparent to-black/50 mix-blend-multiply" />
        </div>
      </div>
      <div className="z-10 box-border flex w-full flex-col items-stretch p-3">
        <span className="text-sm font-bold tracking-tighter text-neutral-200">
          {data.user_name}
        </span>
        <span className="truncate text-xs text-neutral-500">{data.title}</span>
      </div>
    </Link>
  );
}
