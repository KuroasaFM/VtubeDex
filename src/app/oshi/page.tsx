import Stream from "~/components/ui/stream";
import { type Stream as StreamSchema } from "~/server/api/schemas/stream";
import { api } from "~/trpc/server";


export default async function Streams() {

  const streams = (await api.streams.findFavourites({})).map((stream) => {
    return { ...stream, id: JSON.stringify(stream.id) };
  });


  return <div className="px-8 flex flex-col gap-4 @container container mx-auto min-h-full grow">
    <div className="flex items-center justify-center mt-2 mb-2 text-xl">
      <span className="font-bold font-display italic">Mes Oshi</span>
    </div>
    {
      streams.length == 0 && <div className="grow flex items-center justify-center">
        <div className="p-8 rounded-lg bg-neutral-900 flex flex-col gap-2 max-w-2/3 lg:max-w-1/2">
          <span className="font-display font-bold italic text-xl tracking-tighter"><span className="not-italic">🤯</span> Pas d&apos;oshi en live !</span>
          <span className="leading-5 text-justify">Pour afficher du contenu ici, va donc sur les pages <em>Stream</em> ou <em>Vtuber</em> et va marquer quelques vtubers comme étant tes Oshi !</span>
          <span>Tu pourras alors les retrouver ici !</span>
          <span className="text-xs text-neutral-500">Le Saviez-tu ? Le terme &quot;Oshi&quot; viens de la culture Idol japonaise ! Ce mot, qui est dérivé du mot étoile, signifie les Idols que l&apos;on préfere suivre !</span>
        </div>
      </div>
    }
    {
      !!streams.length &&
      <div className="grid grid-cols-2 @4xl:grid-cols-3 h-full w-full items-center justify-center gap-6">
        {streams.map((stream: StreamSchema) => <Stream data={stream} key={stream.id} />)}
      </div>
    }


  </div>
}
