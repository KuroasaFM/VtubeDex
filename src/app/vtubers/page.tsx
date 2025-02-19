import { currentUser } from "@clerk/nextjs/server";
import { StarsIcon } from "lucide-react";
import { type Vtuber } from "~/server/api/schemas/vtuber";
import { api } from "~/trpc/server";
import VtuberSearch from "./components/vtuberSearch";

export default async function Vtubers() {
  const user = await currentUser();

  let vtubers: (Vtuber & { is_oshi?: boolean })[];

  if (user) {
    vtubers = await api.vtuber.findAllWithOshis();
  }
  else {
    vtubers = await api.vtuber.find();
  }

  vtubers = vtubers.map((vtuber) => { return { ...vtuber } });

  return <div className="p-8 2xl:w-2/3 w-full mx-auto">
    <h1 className="font-display font-bold italic tracking-tighter text-2xl mb-8 ">Vtubers </h1>
    <VtuberSearch vtubers={vtubers} />
  </div>
}
