/* eslint-disable react/no-unescaped-entities */
"use client";

import { useUser } from "@clerk/nextjs";
import { LoaderCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { api } from "~/trpc/react";

export default function DashboardChannel() {

  const { user } = useUser();

  const { mutateAsync: importUser, isPending, isIdle } = api.twitch.importUser.useMutation()

  const importer = async () => {
    await importUser({ login: user!.username ?? "" });
    await user?.reload();
  }

  const [show_import, setShowImport] = useState(false);

  useEffect(() => {
    setShowImport(!user?.publicMetadata.has_imported_channel);
  }, [user])


  return <div className="flex flex-col h-full w-full">
    {show_import && <div className="grow flex items-center justify-center p-8 lg:w-2/3 2xl:w-1/3  w-full m-auto">
      <div className="min-w-64 border border-purple-800 rounded-lg p-8 pt-7 transition-all from-neutral-950/50 to-purple-900/20 bg-gradient-to-b shadow-md shadow-purple-400/30">
        {
          !!isIdle && <div>
            <div className="flex items-center mb-8 gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2400 2800" className="w-8 h-8"><path fill="#fff" d="m2200 1300-400 400h-400l-350 350v-350H600V200h1600z" /><g fill="#9146ff"><path d="M500 0 0 500v1800h600v500l500-500h400l900-900V0H500zm1700 1300-400 400h-400l-350 350v-350H600V200h1600v1100z" /><path d="M1700 550h200v600h-200zm-550 0h200v600h-200z" /></g></svg>
              <h2 className=" font-bold font-display italic tracking-tighter text-2xl">Inscrire ma chaine twitch au VtubeDex</h2>
            </div>
            <div className="flex flex-col gap-4">
              <p className="leading-5 text-lg font-bold"> Vous êtes Vtuber francophone et vous voulez ajouter votre chaine au VtubeDex ? C'est ici que ça se passe !</p>
              <p className="leading-5"> Ajouter sa chaine au VtubeDex vous permets d'être référencé et mis en avant sur cette plateforme, à la condition que vous respectiez ces quelques critères : </p>
              <ul className="my-2 list-disc list-inside">
                <li>Vous produisez des streams en tant que Vtuber, sur le Vtubing ou adjacent au Vtubing</li>
                <li>Vous produisez du contenu francophone régulièrement, au moins une fois par mois</li>
                <li>Vous respectez les guidelines de Twitch</li>
              </ul>
              <p className="text-xs italic">
                Vous pourrez a tout moment décider de la visibilité de votre chaine sur la plateforme une fois votre chaine importée.
              </p>
              <div className=" border-purple-800 border rounded-lg flex">
                <span className="text-justify p-4 leading-4 text-sm">Je m'engage sur l'honneur sur le fait que je respecte ces critères, et je reconnais le fait que les administrateurs du site peuvent révoquer mon accès à tout moment si je ne remplis pas ces conditions.</span>

                <div className="w-64 border-l border-purple-800 flex items-center justify-center">
                  <Checkbox />
                </div>
              </div>
              <Button color="red" onClick={importer}>Inscrire ma chaine twitch</Button>
            </div>
          </div>
        }
        {
          !isIdle && <div className="flex items-center justify-center h-full">
            <LoaderCircleIcon className="animate-spin" />
          </div>
        }
      </div>
    </div>}
  </div >
}
