import Stream from "~/components/ui/stream";
import { type Stream as StreamSchema } from "~/server/api/schemas/stream";
import { api } from "~/trpc/server";


export const metadata = {
  title: "Streams | VtubeDex"
}

export default async function Streams() {

  const streams = (await api.streams.find({})).map((stream) => {
    return { ...stream, id: JSON.stringify(stream.id) };
  });


  return <div className="px-8 flex flex-col gap-4 @container container mx-auto">
    <div className="grow flex items-center justify-center mt-2 mb-2 text-xl">
      <span className="font-bold font-display italic select-none">Streams</span>
    </div>
    <div className="grid grid-cols-2 @4xl:grid-cols-3 h-full w-full items-center justify-center gap-6">
      {streams.map((stream: StreamSchema) => <Stream data={stream} key={stream.id} />)}
    </div>

  </div>
}
