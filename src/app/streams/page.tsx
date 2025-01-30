"use client";
import Stream from "~/components/ui/stream";
import { useUserStore } from "~/providers/user-store-provider";
import { type Stream as StreamSchema } from "~/server/api/schemas/stream";
import { api } from "~/trpc/react";


export default function Streams() {

  const { data: streams, isSuccess } = api.streams.find.useQuery();

  const { current_vtuber } = useUserStore((state) => state);

  return <div className="px-8 flex flex-col gap-4 @container container mx-auto">
    <div className="grow flex items-center justify-center mt-2 mb-2 text-xl">
      <span className="font-bold font-display italic">Streams</span>
    </div>
    <div className="bg-neutral-900 h-16 grow rounded-md p-4">
      {current_vtuber?.display_name ?? "undefined"}
    </div>
    <div className="grid grid-cols-2 @5xl:grid-cols-3 h-full w-full items-center justify-center gap-6">
      {isSuccess && streams.map((stream: StreamSchema) => <Stream data={stream} key={stream.id} />)}
    </div>

  </div>
}
