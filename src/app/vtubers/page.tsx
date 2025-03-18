import VtuberSearch from "./components/vtuberSearch";

export const metadata = {
  title: "Vtubers | VtubeDex"
}

export default async function Vtubers() {

  return <div className="px-8 flex flex-col gap-4 @container container mx-auto">
    <div className="grow flex items-center justify-center mt-2 mb-2 text-xl">
      <span className="font-bold font-display italic select-none">Vtubers</span>
    </div>
    <VtuberSearch vtubers={[]} />
  </div>
}
