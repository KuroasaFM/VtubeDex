import { ChevronRightIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
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
        <div className="bg-neutral-900/50 h-60 w-full relative rounded-xl max-w-[780px] flex flex-col items-start justify-center after:shadow-border-pbr after:z-10 after:w-full after:h-full after:absolute after:rounded-xl backdrop-blur-lg overflow-hidden ">
          <Image src={"/vtdex.png"} width={500} height={500} alt="CPT" className="absolute -right-20 -top-10 drop-shadow-xl opacity-50" />

          <div className="font-display font-bold text-4xl italic leading-7 px-8 flex flex-col z-10">
            <span className="text-xl -mb-2 text-neutral-400">Tout le vtubing fr </span>
            <span className="drop-shadow-lg">sur un seul site</span>
          </div>
          <div className="px-8 mt-4 z-10">
            <ul className="list-disc list-inside text-sm text-neutral-400">
              <li>Suivez vos Oshis</li>
              <li>Partagez vos streams</li>
              <li>Découvrez d'autres Vtubers francophones</li>
              <li>Et plein d'autres trucs a venir ! (Emissions, Groupes, Evenements ...)</li>
            </ul>
          </div>


        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Link href={"/streams"} >

          <h2 className="italic font-display font-bold text-xl flex items-center group"><span>Streams</span> <ChevronRightIcon size={16} className="group-hover:opacity-100 opacity-0 transition-all" /></h2>
        </Link>
        <div className="box-border flex *:w-80 gap-4 overflow-x-scroll">
          {
            streams.map((stream) => <Stream data={stream} key={stream.id} />)
          }
          {/* <Link className="bg-neutral-900 hover:bg-neutral-800 rounded-lg flex flex-col justify-center items-center hover:text-neutral-600 text-neutral-700 transition-all !w-40 p-4" href={"/streams"}> */}
          {/*   <div> */}
          {/*     <PlusIcon size={32} /> */}
          {/*   </div> */}
          {/*   <div className="text-center">Voir plus de streams</div> */}
          {/* </Link> */}
        </div>
      </div>
    </div >
  );
}
