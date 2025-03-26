"use client";

import { useUser } from "@clerk/nextjs";
import { TvIcon } from "lucide-react";

import Link from "next/link";
import { Button } from "~/components/ui/button";
import Image from "next/image";
import { useUserStore } from "~/providers/user-store-provider";
import { Badge } from "~/components/ui/badge";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";

export default function DashboardHome() {
  const { user } = useUser();
  const vtuber = useUserStore((s) => s.current_vtuber);

  return (
    <div className="flex h-full w-full flex-col gap-8 p-8 pt-12">
      <h1 className="font-display text-4xl font-bold tracking-tighter italic">
        Dashboard
      </h1>
      {!user?.publicMetadata.has_imported_channel && (
        <div className="flex items-center rounded-lg border border-purple-800 bg-linear-to-bl from-purple-500/50 to-neutral-950 p-4">
          <span>Importez votre chaine twitch !</span>
          <div className="grow" />
          <Link href={"/dashboard/channel"}>
            <Button className="self-end">Importer ma chaine</Button>
          </Link>
        </div>
      )}
      {!!user?.publicMetadata.has_imported_channel && (
        <div className="shadow-border-pbr flex items-center gap-4 rounded-lg bg-neutral-900 p-4">
          <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-white/15 bg-neutral-900">
            {vtuber && (
              <Image
                src={vtuber.profile_image_url}
                height={200}
                width={200}
                alt={vtuber.twitch_login}
              ></Image>
            )}
          </div>
          <span className="flex items-center gap-1 text-lg text-neutral-300">
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 2400 2800"
            >
              <path
                fill="#fff"
                d="m2200 1300-400 400h-400l-350 350v-350H600V200h1600z"
              />
              <g fill="#9146ff">
                <path d="M500 0 0 500v1800h600v500l500-500h400l900-900V0H500zm1700 1300-400 400h-400l-350 350v-350H600V200h1600v1100z" />
                <path d="M1700 550h200v600h-200zm-550 0h200v600h-200z" />
              </g>
            </svg>
            {vtuber?.display_name}
          </span>
          {vtuber?.isHidden && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Badge>Caché</Badge>
                </TooltipTrigger>
                <TooltipContent>
                  Votre chaîne n&apos;apparait pas sur le VtubeDex
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          <div className="grow" />
          <Link href={"/dashboard/channel"}>
            <Button className="cursor-pointer self-end" variant={"pbr"}>
              <TvIcon /> Ma Chaine
            </Button>
          </Link>
        </div>
      )}

      <div>
        <div className="grid grid-cols-2 gap-8">
          <div className="shadow-border-pbr rounded-lg bg-neutral-900 p-8">
            <h2 className="font-display text-xl font-bold tracking-tighter italic">
              Ici prochainement
            </h2>
            <ul className="my-4 list-inside list-disc text-neutral-500">
              <li>Editer votre page Wiki VtubeDex</li>
              <li>Stocker et distribuer vos assets: pngs, logos, etc.</li>
              <li>
                Mettre en avant vos groupes, vos organisations, vos associations
              </li>
              <li>
                Publier des infos sur vos évenements (redébuts, tournois,
                serveurs RP, etc.) et vos plannings de stream
              </li>
              <li>Centraliser l&apos;accès aux épisodes de vos émissions</li>
            </ul>
            <span>Stay tuned !</span>
          </div>
          <div className="aspect-video rounded-lg border-2 border-dotted"></div>
          <div className="aspect-video rounded-lg border-2 border-dotted"></div>
          <div className="aspect-video rounded-lg border-2 border-dotted"></div>
          <div className="aspect-video rounded-lg border-2 border-dotted"></div>
          <div className="aspect-video rounded-lg border-2 border-dotted"></div>
        </div>
      </div>
    </div>
  );
}
