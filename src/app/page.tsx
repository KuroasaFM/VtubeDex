import { ChevronRightIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Stream from "~/components/ui/stream";
import { api } from "~/trpc/server";

export default async function Home() {
  const streams = (await api.streams.find({ limit: 6 })).map((stream) => ({
    ...stream,
    id: stream.id.toString(),
  }));

  return (
    <div className="@container m-auto flex h-full w-full flex-col gap-8 p-8 pt-12 @5xl:w-3/4">
      <div className="flex flex-col items-center justify-center gap-0">
        <div className="-mb-1 flex h-1 scale-50 transform">
          <div className="w-8 bg-blue-900" />
          <div className="w-8 bg-neutral-500" />
          <div className="w-8 bg-red-900" />
        </div>
        <h1 className="font-display text-5xl font-extrabold tracking-tighter text-neutral-800 italic select-none">
          Vtube<span className="text-neutral-700">Dex</span>
        </h1>
      </div>
      <div className="my-8 flex flex-col items-center">
        <div className="after:shadow-border-pbr relative flex h-60 w-full max-w-[780px] flex-col items-start justify-center overflow-hidden rounded-xl bg-neutral-900/50 backdrop-blur-lg after:absolute after:z-10 after:h-full after:w-full after:rounded-xl">
          <Image
            src={"/vtdex.png"}
            width={500}
            height={500}
            alt="CPT"
            className="absolute -top-10 -right-20 opacity-50 drop-shadow-xl"
          />

          <div className="font-display z-10 flex flex-col px-8 text-4xl leading-7 font-bold italic">
            <span className="-mb-2 text-xl text-neutral-400">
              Tout le vtubing fr{" "}
            </span>
            <span className="drop-shadow-lg">sur un seul site</span>
          </div>
          <div className="z-10 mt-4 px-8">
            <ul className="list-inside list-disc text-sm text-neutral-400">
              <li>Suivez vos Oshis</li>
              <li>Partagez vos streams</li>
              <li>Découvrez d&apos;autres Vtubers francophones</li>
              <li>
                Et plein d&apos;autres trucs a venir ! (Emissions, Groupes,
                Evenements ...)
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        <div className="col-span-3 flex flex-col gap-4">
          <Link href={"/streams"}>
            <h2 className="font-display group flex items-center text-xl font-bold italic">
              <span>Streams</span>{" "}
              <ChevronRightIcon
                size={16}
                className="opacity-0 transition-all group-hover:opacity-100"
              />
            </h2>
          </Link>
          <div className="box-border grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {streams.map((stream) => (
              <Stream data={stream} key={stream.id} />
            ))}
            {/* <Link className="bg-neutral-900 hover:bg-neutral-800 rounded-lg flex flex-col justify-center items-center hover:text-neutral-600 text-neutral-700 transition-all !w-40 p-4" href={"/streams"}> */}
            {/*   <div> */}
            {/*     <PlusIcon size={32} /> */}
            {/*   </div> */}
            {/*   <div className="text-center">Voir plus de streams</div> */}
            {/* </Link> */}
          </div>
        </div>
        <div>
          <Link href={"/"}>
            <h2 className="font-display group flex items-center text-xl font-bold italic">
              <span>Évenements</span>{" "}
              <ChevronRightIcon
                size={16}
                className="opacity-0 transition-all group-hover:opacity-100"
              />
            </h2>
          </Link>
          <div className="flex h-32 items-center justify-center">
            <div className="rounded-xl p-4 text-neutral-800 backdrop-blur-lg select-none">
              Soon™
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
