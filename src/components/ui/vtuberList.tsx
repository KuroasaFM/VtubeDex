"use client";
import { type Vtuber } from "~/server/api/schemas/vtuber";
import Image from "next/image";
import { SquareArrowOutUpRightIcon, StarsIcon } from "lucide-react";
import { SignedIn } from "@clerk/nextjs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import { TooltipPortal } from "@radix-ui/react-tooltip";
import Link from "next/link";
import { api } from "~/trpc/react";

interface VtuberListProps {
  vtubers: (Vtuber & { is_oshi?: boolean })[];
}

export default function VtuberList({ vtubers }: VtuberListProps) {
  console.log("api", api.vtuber);
  const { mutate: setAsOshi } = api.vtuber.setAsOshi.useMutation();

  const setVtuberAsOshi = async (vtuber: Vtuber & { is_oshi?: boolean }) => {
    const { twitch_login: vtuber_login, is_oshi } = vtuber;
    setAsOshi({
      vtuber_login,
      is_oshi: !is_oshi,
    });

    // INFO: Updating state for faster visual change
    const vtubers_clone = vtubers;

    vtubers_clone[
      vtubers_clone.findIndex((vtuber) => vtuber.twitch_login == vtuber_login)
    ]!.is_oshi = !is_oshi;

    // await refetchVtubers();
  };
  return (
    <div className="overflow-hidden rounded-lg">
      {vtubers.map((vtuber) => (
        <div
          className="flex items-center gap-4 p-4 transition-all odd:bg-neutral-900/50 hover:bg-neutral-900"
          key={JSON.stringify(vtuber.id)}
        >
          <div>
            <div className="h-10 w-10 overflow-hidden rounded-full bg-neutral-900 outline-2 outline-offset-[-2px] outline-neutral-300/25">
              {!!vtuber.profile_image_url && (
                <Image
                  src={vtuber.profile_image_url ?? ""}
                  height={200}
                  width={200}
                  alt={vtuber.twitch_login}
                ></Image>
              )}
              {!vtuber.profile_image_url && (
                <div className="font-display flex h-full w-full items-center justify-center text-center text-xl font-bold text-neutral-700 italic">
                  {vtuber.twitch_login
                    .split("_")
                    .map((str) => str.charAt(0).slice(0, 1))}
                </div>
              )}
            </div>
          </div>
          <span className="text-lg font-bold select-none md:text-sm">
            {vtuber.display_name || vtuber.twitch_login}
          </span>
          <div className="group text-neutral-700 hover:text-neutral-600 hover:underline">
            <Link
              href={`https://twitch.tv/${vtuber.twitch_login}`}
              target="_blank"
              className="flex gap-1 truncate text-xs"
            >
              <SquareArrowOutUpRightIcon size={16} />
              <div className="hidden md:block">
                twitch.tv/{vtuber.twitch_login}
              </div>
            </Link>
          </div>
          <div className="grow" />
          <SignedIn>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className="cursor-pointer rounded-lg p-2 hover:bg-neutral-800"
                    onClick={() => setVtuberAsOshi(vtuber)}
                  >
                    {!vtuber.is_oshi && <StarsIcon strokeWidth={1} size={20} />}
                    {!!vtuber.is_oshi && (
                      <StarsIcon strokeWidth={2} fill="white" size={20} />
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipPortal>
                  <TooltipContent className="text-xs text-neutral-500 select-none">
                    {!vtuber.is_oshi && <span>Oshi ce vtuber</span>}
                    {!!vtuber.is_oshi && <span>Ne plus Oshi ce vtuber</span>}
                  </TooltipContent>
                </TooltipPortal>
              </Tooltip>
            </TooltipProvider>
          </SignedIn>
        </div>
      ))}
    </div>
  );
}
