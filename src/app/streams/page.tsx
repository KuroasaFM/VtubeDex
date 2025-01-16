import { Skeleton } from "~/components/ui/skeleton";



export default function Streams() {

  const items = ["", "", "", "", "", "", "", "", "", "", "", "", "", ""];
  return <div className="px-8 flex flex-col gap-4">
    <div className="grow flex items-center justify-center mt-2 mb-2 text-xl">
      <span className="font-bold font-display italic">Streams</span>
    </div>
    <div className="bg-neutral-900 h-16 grow rounded-md">
    </div>
    <div className="grid grid-cols-3 gap-4">
      {
        items.map((item) => <div key={item} className="flex-col flex gap-2">
          <Skeleton className="aspect-video" />
          <Skeleton className="h-4" />
          <Skeleton className="h-4 w-16" />
        </div>)
      }
    </div>

  </div>
}
