"use client";
import Stream from "~/components/ui/stream";
import { type Stream as StreamSchema } from "~/server/api/schemas/stream";
import { api } from "~/trpc/react";

export default function Test() {
  const { data: streams, isSuccess } = api.streams.find.useQuery();
  return <div className="@container container mx-auto">
    <div className="grid grid-cols-2 @4xl:grid-cols-3 h-full w-full items-center justify-center gap-6 p-8">
      {isSuccess && streams.map((stream: StreamSchema) => <Stream data={stream} key={stream.id} />)}
    </div>
  </div >
}
