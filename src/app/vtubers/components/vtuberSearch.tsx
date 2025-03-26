"use client";

import {
  LoaderCircleIcon,
  SquareArrowOutUpRightIcon,
  StarsIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Input } from "~/components/ui/input";
import { type Vtuber } from "~/server/api/schemas/vtuber";
import { api } from "~/trpc/react";
import { SignedIn } from "@clerk/nextjs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { TooltipPortal } from "@radix-ui/react-tooltip";
import { useDebounce } from "@uidotdev/usehooks";

interface VtuberSearchProps {
  vtubers: (Vtuber & { is_oshi?: boolean })[];
}

export default function VtuberSearch(props: VtuberSearchProps) {
  const [search, setSearch] = useState("");
  const [vtubers, setVtubers] = useState(props.vtubers);

  const debouncedSearch = useDebounce(search, 300);

  const { data, isLoading } = api.vtuber.search.useQuery({
    search: debouncedSearch,
  });
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

  useEffect(() => {
    if (data) setVtubers(data);
  }, [data]);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Input
          onInput={(e) => setSearch(e.currentTarget.value)}
          placeholder="Chercher un Vtuber ..."
          className="placeholder:text-neutral-700 placeholder:italic focus-visible:border-neutral-700 focus-visible:ring-transparent"
        />
      </div>
      {!!isLoading && (
        <div className="flex items-center justify-center text-neutral-800">
          <LoaderCircleIcon className="animate-spin" />
        </div>
      )}
      {!isLoading && (
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
                    <div className="font-display flex h-full w-full items-center justify-center text-center font-bold text-neutral-700 italic">
                      {vtuber.twitch_login
                        .split("_")
                        .map((str) => str.charAt(0).slice(0, 1))}
                    </div>
                  )}
                </div>
              </div>
              <span className="text-sm font-bold select-none">
                {vtuber.display_name || vtuber.twitch_login}
              </span>
              <div className="group flex gap-1 text-neutral-700 hover:text-neutral-600 hover:underline">
                <SquareArrowOutUpRightIcon size={16} />
                <Link
                  href={`https://twitch.tv/${vtuber.twitch_login}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs"
                >
                  twitch.tv/{vtuber.twitch_login}
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
                        {!vtuber.is_oshi && (
                          <StarsIcon strokeWidth={1} size={20} />
                        )}
                        {!!vtuber.is_oshi && (
                          <StarsIcon strokeWidth={2} fill="white" size={20} />
                        )}
                      </div>
                    </TooltipTrigger>
                    <TooltipPortal>
                      <TooltipContent className="text-xs text-neutral-500 select-none">
                        {!vtuber.is_oshi && <span>Oshi ce vtuber</span>}
                        {!!vtuber.is_oshi && (
                          <span>Ne plus Oshi ce vtuber</span>
                        )}
                      </TooltipContent>
                    </TooltipPortal>
                  </Tooltip>
                </TooltipProvider>
              </SignedIn>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
