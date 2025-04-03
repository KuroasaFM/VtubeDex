import { SignInButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Stream from "~/components/ui/stream";
import VtuberList from "~/components/ui/vtuberList";
import { type Stream as StreamSchema } from "~/server/api/schemas/stream";
import { api } from "~/trpc/server";

export const metadata = {
  title: "Mes Oshi | VtubeDex",
};

export default async function Streams() {
  const user = await currentUser();

  if (!user)
    return (
      <div className="flex h-full items-center justify-center select-none">
        <div className="flex flex-col items-center gap-2 text-neutral-400 select-none">
          <span>Vous n&apos;êtes pas connecté !</span>
          <span className="text-sm text-neutral-500 select-none">
            Pour utiliser cette feature, veuillez vous{" "}
            <SignInButton>
              <span className="cursor-pointer font-bold text-neutral-300 hover:underline">
                Connecter
              </span>
            </SignInButton>
          </span>
        </div>
      </div>
    );

  const streams = (await api.streams.findFavourites({})).map((stream) => {
    return { ...stream, id: JSON.stringify(stream.id) };
  });
  const oshis = (await api.vtuber.findOshis()).map((oshi) => {
    return { ...oshi, id: JSON.stringify(oshi.id), is_oshi: true };
  });
  return (
    <div className="@container container mx-auto flex min-h-full grow flex-col gap-4 px-8">
      <div className="mt-2 mb-2 flex items-center justify-center text-xl">
        <span className="font-display font-bold italic">Mes Oshi</span>
      </div>
      {oshis.length == 0 && (
        <div className="flex grow items-center justify-center">
          <div className="flex max-w-2/3 flex-col gap-2 rounded-lg bg-neutral-900 p-8 lg:max-w-1/2">
            <span className="font-display text-xl font-bold tracking-tighter italic">
              <span className="not-italic">🤯</span> Tu n'as pas encore d'oshi
              !!
            </span>
            <span className="text-justify leading-5">
              Pour afficher du contenu ici, va donc sur la page
              <em>Vtuber</em> et va marquer quelques vtubers comme étant tes
              Oshi !
            </span>
            <span>Tu pourras alors les retrouver ici !</span>
            <span className="text-xs text-neutral-500">
              Le Saviez-tu ? Le terme &quot;Oshi&quot; viens de la culture Idol
              japonaise ! Ce mot, qui est dérivé du mot étoile, signifie les
              Idols que l&apos;on préfere suivre !
            </span>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-16">
        <div>
          <h2 className="font-display mb-2 font-bold tracking-tighter italic">
            Oshi en live
          </h2>
          {!!streams.length && (
            <div className="grid h-full w-full grid-cols-2 items-center gap-6 @4xl:grid-cols-3">
              {streams.map((stream: StreamSchema) => (
                <Stream data={stream} key={stream.id} />
              ))}
            </div>
          )}
          {!streams.length && (
            <div className="flex h-32 items-center justify-center">
              <div className="m-auto text-neutral-700">
                🤯 Oh nyo, y'a personne !
              </div>
            </div>
          )}
        </div>
        <div>
          <h2 className="font-display mb-2 font-bold tracking-tighter italic">
            Tous mes Oshi
          </h2>
          <VtuberList vtubers={oshis} />
        </div>
      </div>
    </div>
  );
}
