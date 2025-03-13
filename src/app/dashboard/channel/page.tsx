/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { useUser } from "@clerk/nextjs";
import { CircleX, LoaderCircleIcon, SlashIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "~/components/ui/breadcrumb";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Switch } from "~/components/ui/switch";
import { useUserStore } from "~/providers/user-store-provider";
import { api } from "~/trpc/react";

export default function DashboardChannel() {

  const { user } = useUser();

  const { mutateAsync: importUser, isIdle, isError, isPending } = api.twitch.importUser.useMutation()

  const { mutateAsync: setHidden, data: new_vtuber } = api.vtuber.setHidden.useMutation();

  const current_vtuber = useUserStore((s) => s.current_vtuber)
  const setVtuber = useUserStore((s) => s.setVtuber)

  const importer = async () => {
    await importUser({ login: user!.username ?? "" });
    await user?.reload();
  }

  const [show_import, setShowImport] = useState(false);
  useEffect(() => {
    setShowImport(!user?.publicMetadata.has_imported_channel);
  }, [user])


  const [isHiddenSwitchChecked, setHiddenSwitchChecked] = useState(current_vtuber?.isHidden ?? false)

  const updateHiddenState = async (checked: boolean) => {
    // INFO: Decoupling front-end from back-end lag
    setHiddenSwitchChecked(checked)
    if (!current_vtuber) return;
    await setHidden({ login: current_vtuber?.twitch_login, isHidden: checked })
  }

  useEffect(() => {
    if (new_vtuber) {

      console.log(new_vtuber);

      setVtuber(new_vtuber);
    }
  }, [new_vtuber])

  if (!user) return <div></div>

  return <div className="flex flex-col h-full w-full">
    {show_import && <div className="grow flex items-center justify-center p-8 lg:w-2/3 2xl:w-1/3  w-full m-auto">
      <div className="min-w-64 border border-purple-800 rounded-lg p-8 pt-7 transition-all from-neutral-950/50 to-purple-900/20 bg-linear-to-b shadow-md shadow-purple-400/30">
        {
          !isPending && <div>
            <div className="flex items-center mb-8 gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2400 2800" className="w-8 h-8"><path fill="#fff" d="m2200 1300-400 400h-400l-350 350v-350H600V200h1600z" /><g fill="#9146ff"><path d="M500 0 0 500v1800h600v500l500-500h400l900-900V0H500zm1700 1300-400 400h-400l-350 350v-350H600V200h1600v1100z" /><path d="M1700 550h200v600h-200zm-550 0h200v600h-200z" /></g></svg>
              <h2 className=" font-bold font-display italic tracking-tighter text-2xl">Inscrire ma chaine twitch au VtubeDex</h2>
            </div>
            <div className="flex flex-col gap-4">
              <p className="leading-5 text-lg font-bold"> Vous êtes Vtuber francophone et vous voulez ajouter votre chaine au VtubeDex ? C'est ici que ça se passe !</p>
              <p className="leading-5"> Ajouter votre chaine au VtubeDex vous permets d'être référencé et mis en avant sur cette plateforme, à la condition que vous respectiez ces quelques critères : </p>
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
              {
                isError && <div className="bg-red-500 p-4 rounded-lg flex items-center gap-4">
                  <CircleX size={40} />
                  <div>
                    <div className="font-bold tracking-tight">
                      Oups ! C'est pété
                    </div>
                    <div className="leading-4 text-red-200 text-sm">
                      Ressayez dans quelques secondes, ou allez donc gueuler sur les gestionnaires du site, ça devrait passer au bout d'un moment
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        }
        {
          !!isPending && <div className="flex items-center justify-center h-full">
            <LoaderCircleIcon className="animate-spin" />
          </div>
        }
      </div>
    </div>}
    {
      !show_import && current_vtuber && <div className="flex-col px-8 pt-12">
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              <BreadcrumbSeparator>
                <SlashIcon />
              </BreadcrumbSeparator>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="font-display font-bold italic text-4xl tracking-tighter">Ma Chaine</h1>
        </div>
        <div className="flex-col flex gap-4 mt-16 container">
          <div className=" rounded-lg bg-neutral-900 p-8 flex items-center gap-2">
            <div className="rounded-full overflow-hidden">
              <Image src={current_vtuber?.profile_image_url ?? ""} alt={""} width={32} height={32} />
            </div>
            {current_vtuber?.display_name}
          </div>

          <div className=" rounded-lg bg-neutral-900">
            <div className="p-8">
              <div className="flex flex-row-reverse items-center">
                <div className="w-2/3 pl-8 ">
                  <div className="tracking-tight">Cacher ma chaine</div>
                  <p className="text-sm text-neutral-500"> En activant cette option, votre chaine twitch sera totalement invisible sur le site. Vous n'apparaitrez ni dans les streams, ni dans les recherches de Vtubers</p>
                </div>
                <div className="pr-8 border-r h-full">
                  <Switch className="dark" checked={isHiddenSwitchChecked} onCheckedChange={updateHiddenState} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    }
  </div >
}
