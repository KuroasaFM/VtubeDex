"use client";
import { LoaderCircleIcon } from "lucide-react";
import { api } from "~/trpc/react";

export const dynamic = "force-dynamic";

export default function Home() {


  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <div className="flex flex-col justify-center items-center gap-0">
        <div className="flex h-1 transform opacity-50 scale-50 -mb-1">
          <div className="bg-blue-900 w-8" />
          <div className="bg-neutral-500 w-8" />
          <div className="bg-red-900 w-8" />
        </div>
        <h1 className="text-5xl font-extrabold tracking-tighter font-display italic text-neutral-800 select-none">
          Vtube<span className="text-neutral-700">Dex</span>
        </h1>
      </div>
    </div >
  );
}
