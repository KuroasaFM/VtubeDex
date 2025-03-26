export default function Faq() {
  return (
    <div className="@container container mx-auto flex flex-col justify-center gap-4 px-8">
      <div className="mt-2 mb-8 flex grow items-center justify-center text-xl">
        <span className="font-display font-bold italic select-none">
          F.A.Q.
        </span>
      </div>
      <div className="mx-auto flex w-2/3 flex-col">
        <div className="mb-8">
          <div className="text-lg">Q. C&apos;est qui qu&apos;a fait ça ?</div>
          <div className="mb-4 text-sm font-light text-neutral-400">
            Le VtubeDex est développé et maintenu par{" "}
            <strong className="underline">Neon Kuroasa</strong>.
          </div>
        </div>
        <div className="mb-8">
          <div className="text-lg">Q. Pourquoi le VtubeDex ?</div>
          <div className="mb-4 text-sm font-light text-neutral-400">
            Le VtubeDex est la pour répondre a plusieurs questions :
          </div>
          <ul className="mb-4 list-inside list-disc text-sm font-light text-neutral-400">
            <li>Comment est-ce que je fait pour découvrir le Vtubing FR ?</li>
            <li>Comment je fait pour interagir avec des vtubers fr ?</li>
            <li>Qu'est ce qu'il se passe en ce moment dans le Vtubing FR ?</li>
          </ul>

          <div className="mb-4 text-sm font-light text-neutral-400">
            Pendant longtemps, la réponse a ces questions c'était "Va sur
            twitter et check le hashtag #VtuberFr". Le probleme c'est
            qu'aujourd'hui, avec les pitreries de Musk et la multiplication des
            plateformes de microblogging, ça n'est plus si évident.
          </div>
          <div className="mb-4 text-sm font-light text-neutral-400">
            L'objectif du VtubeDex est donc de fournir une plateforme unique qui
            permets de rassembler toutes les informations pertinentes au Vtubing
            Francophone, tout en essayant de creer un maximum d'outils qui
            permettent a tout un chacun de se promouvoir et de se présenter,
            d'organiser et de produire du contenu.
          </div>
        </div>
        <div className="mb-8">
          <div className="text-lg">
            Q. Comment je peux faire pour avoir ma chaine sur le VtubeDex ?{" "}
          </div>
          <div className="mb-4 text-sm font-light text-neutral-400">
            Il suffit de se connecter avec son compte twitch en utilisant le
            bouton en bas a gauche dans la sidebar.
          </div>
          <div className="mb-4 text-sm font-light text-neutral-400">
            Une fois que c'est fait, dans le menu en bas a gauche, vous aurez
            une option pour importer votre chaine twitch
          </div>
        </div>
        <div className="mb-8">
          <div className="text-lg">
            Q. Est-ce que je peux utiliser le VtubeDex sans être Vtuber ?{" "}
          </div>
          <div className="mb-4 text-sm font-light text-neutral-400">
            Bien sur. Le Vtubedex est conçu comme étant une plateforme pour
            réunir tout le vtubing au meme endroit, ce qui implique aussi les
            viewers.
          </div>
          <div className="mb-4 text-sm font-light text-neutral-400">
            Vous pouvez follow des Vtubers grace au systeme d'Oshis. Ce systeme
            sera approfondi sur le long terme pour que vous puissiez avoir
            toutes les infos concernant vos créateurs de contenus favoris tels
            que leurs plannings, leurs évenements, leurs émissions, etc.
          </div>
        </div>
        <div className="mb-8">
          <div className="text-lg">
            Q. Comment est gérée la modération du contenu ?{" "}
          </div>
          <div className="mb-4 text-sm font-light text-neutral-400">
            Le contenu est modéré par Neon directement dans un premier temps
          </div>
          <div className="mb-4 text-sm font-light text-neutral-400">
            Les règles sont simples :
          </div>
          <ul className="mb-4 list-inside list-disc text-sm font-light text-neutral-400">
            <li>Respectez les TOS de Twitch</li>
            <li>Ne soyez pas un connard</li>
          </ul>
          <div className="mb-4 text-sm font-light text-neutral-400">
            Si y'a besoin de faire un rapport, envoyez moi les infos sur bluesky
            : @kuroasaneon.bsky.social
          </div>
        </div>
        <div className="mb-8">
          <div className="text-lg">Q. C'est quoi les plans a long terme ? </div>
          <ul className="mb-4 list-inside list-disc text-sm font-light text-neutral-400">
            <li>
              VAULT: Uploader ses assets, ses logos, ses PNGs et avoir un seul
              lien pour tout partager
            </li>
            <li>
              WIKI: Avoir une page avec ses informations principales, ses
              réseaux, etc.
            </li>
            <li>
              GROUPS: Gerer ses groupes, avoir une page d'information sur tous
              les groupes du vtubing FR
            </li>
            <li>
              EVENTS: Lister et promouvoir les serveurs communautaires, redébuts
              et autres events de la commu{" "}
            </li>
            <li>
              EMISSIONS: Lister les émissions et podcasts du Vtubing FR, en
              lister les épisodes et les lives
            </li>
            <li>
              PLANNING: Gerer son planning sur le VtubeDex, avoir des
              informations sur les streams qui se chevauchent avec les membres
              des groupes, etc.{" "}
            </li>
            <li>
              COLLAB: Des chatrooms pour faciliter l'orga des collabs avec
              l'acces aux vaults de tout le monde, gestion du choix des dates,
              etc.
            </li>
            <li>Et bien plus encore ...</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
