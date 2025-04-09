"use client";
import { LoaderCircleIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import Stream from "~/components/ui/stream";
import { api } from "~/trpc/react";

export default function Raids() {
  const {
    data: stream,
    refetch,
    isFetching,
  } = api.streams.findRandom.useQuery(undefined, {
    initialData: undefined,
  });

  return (
    <div className="@container container mx-auto flex h-full flex-col gap-4 px-4 md:px-8">
      <div className="mt-2 mb-2 flex grow items-center justify-center text-xl">
        <span className="font-display font-bold italic select-none">
          Raidmachine
        </span>
      </div>
      <div className="flex h-full grow flex-col items-center justify-center gap-8 transition-all">
        {isFetching && (
          <div className="flex h-96 items-center justify-center text-neutral-800">
            <LoaderCircleIcon className="animate-spin" />
          </div>
        )}
        {!!stream && !isFetching && (
          <div className="max-w-2xl">
            {/* {JSON.stringify(stream)} */}
            <Stream data={stream} />
          </div>
        )}
        <div className="flex min-w-xl flex-col items-center rounded-lg bg-neutral-900 p-4">
          <Button variant={"pbr"} size={"lg"} onClick={() => refetch()}>
            Trouve moi quelqu&apos;un a Raid !
          </Button>
        </div>
      </div>
    </div>
  );
}
