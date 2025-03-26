import Stream from "~/components/ui/stream";
import { type Stream as StreamSchema } from "~/server/api/schemas/stream";
import { api } from "~/trpc/server";

export const metadata = {
  title: "Streams | VtubeDex",
};

export default async function Streams() {
  const streams = (await api.streams.find({})).map((stream) => {
    return { ...stream, id: JSON.stringify(stream.id) };
  });

  return (
    <div className="@container container mx-auto flex flex-col gap-4 px-8">
      <div className="mt-2 mb-2 flex grow items-center justify-center text-xl">
        <span className="font-display font-bold italic select-none">
          Streams
        </span>
      </div>
      <div className="grid h-full w-full grid-cols-2 items-center justify-center gap-6 @4xl:grid-cols-3">
        {streams.map((stream: StreamSchema) => (
          <Stream data={stream} key={stream.id} />
        ))}
      </div>
    </div>
  );
}
