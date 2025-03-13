import { ChevronRightIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import Stream from "~/components/ui/stream";
import { api } from "~/trpc/server";

export default async function Home() {
  const streams = (await api.streams.find({ limit: 6 })).map((stream) => ({ ...stream, id: stream.id.toString() }))


  return (
    <div className="flex flex-col h-full w-full p-8 pt-12 gap-8 @container">
      <div className="flex flex-col justify-center items-center gap-0">
        <div className="flex h-1 transform scale-50 -mb-1">
          <div className="bg-blue-900 w-8" />
          <div className="bg-neutral-500 w-8" />
          <div className="bg-red-900 w-8" />
        </div>
        <h1 className="text-5xl font-extrabold tracking-tighter font-display italic text-neutral-800 select-none">
          Vtube<span className="text-neutral-700">Dex</span>
        </h1>
      </div>
      <div className="flex flex-col items-center">
        <div className="bg-neutral-900 h-80 w-full rounded-xl max-w-[780px] flex items-center justify-start">
          <div className="font-display font-bold text-4xl italic leading-7 p-8">
            Tout le vtubing fr <br /> sur un seul site
          </div>


        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Link href={"/streams"} >

          <h2 className="italic font-display font-bold text-xl flex items-center group"><span>Streams</span> <ChevronRightIcon size={16} className="group-hover:opacity-100 opacity-0 transition-all" /></h2>
        </Link>
        <div className="box-border flex *:w-80 gap-4">
          {
            streams.map((stream) => <Stream data={stream} key={stream.id} />)
          }
          <Link className="bg-neutral-900 hover:bg-neutral-800 rounded-lg flex flex-col justify-center items-center hover:text-neutral-600 text-neutral-700 transition-all !w-40 p-4" href={"/streams"}>
            <div>
              <PlusIcon size={32} />
            </div>
            <div className="text-center">Voir plus de streams</div>
          </Link>
        </div>
      </div>
    </div >
  );
}
