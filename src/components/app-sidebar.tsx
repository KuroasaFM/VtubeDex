import { SignedOut, SignInButton, SignedIn, SignOutButton } from "@clerk/nextjs";
import { SidebarHeader, SidebarContent, SidebarGroup, SidebarFooter, Sidebar, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroupLabel } from "./ui/sidebar";
import { currentUser } from "@clerk/nextjs/server";
import { DoorOpenIcon, HomeIcon, ImportIcon, LayoutDashboardIcon, SquareArrowOutUpRightIcon, TvIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { env } from "process";

const sidebarItems = [
  {
    title: "Home",
    icon: HomeIcon,
    href: "/",
  },
  {
    title: "Streams",
    icon: TvIcon,
    href: "/streams"
  },
  // {
  //   title: "Vtubers",
  //   icon: UserIcon,
  //   href: "/vtubers"
  // },
  // {
  //   title: "Évenements",
  //   icon: CalendarRangeIcon,
  //   href: "/",
  // },
  // {
  //   title: "Groupes",
  //   icon: UsersIcon,
  //   href: "/",
  // },
  // {
  //   title: "Statistiques",
  //   icon: ChartColumnIcon,
  //   href: "/",
  // },
]
export async function AppSidebar() {

  const user = await currentUser();

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <div className="p-2 flex items-end">
          <div className="text-2xl font-display font-bold italic tracking-tighter select-none text-neutral-500 hover:text-neutral-400 transition-all">
            VtubeDex
          </div>
          <Badge variant={"outline"} className="scale-90">α0.1.0</Badge>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {
          env.NODE_ENV == "development" &&
          <Badge variant={"outline"} className="scale-90 bg-orange-500">Development environment</Badge>
        }
        <SidebarGroup >
          <SidebarMenu>
            {sidebarItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link href={item.href} className="">
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SignedIn>

          <SidebarGroup>
            <SidebarGroupLabel>Mon Vtubedex</SidebarGroupLabel>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/dashboard">
                  <LayoutDashboardIcon />
                  <span>Dashboard</span>
                  {
                    !user?.publicMetadata.has_imported_channel && <div>

                      <div className="animate-ping h-2 w-2 bg-purple-500 rounded-full absolute top-0 left-0"></div>
                      <div className="h-2 w-2 bg-purple-500/50 rounded-full absolute top-0 left-0"></div>
                    </div>
                  }
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarGroup>
        </SignedIn>
      </SidebarContent>
      <SidebarFooter>
        <SignedOut>
          <SignInButton>
            <Button variant="ghost">Connexion</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <DropdownMenu>

            <DropdownMenuTrigger className="outline-hidden ring-none p-2 hover:bg-neutral-800/50 transition-all rounded-lg cursor-pointer">
              <div className="flex flex-col gap-2 w-full ">
                <div className="flex flex-row items-center gap-2">
                  {user && <Image src={user.imageUrl} alt="userprofile" width={100} height={100} className="w-10 h-10 select-none rounded-full border-2 border-zinc-50/25 box-border" />
                  }<div className="flex flex-col items-start">
                    <div className="font-medium tracking-tight select-none">{user?.fullName}</div>
                    <div className="text-zinc-500 text-xs -mt-1 select-none">@{user?.username}</div>
                  </div>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent sideOffset={6} className="w-60">
              <DropdownMenuLabel className="flex justify-center">{user?.fullName}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="font-display text-xs select-none text-neutral-500 italic -mb-1">Mon VtubeDex</DropdownMenuLabel>
              {
                !!user?.publicMetadata.has_imported_channel && <div>

                  <DropdownMenuItem><SquareArrowOutUpRightIcon /> Ma Chaine Twitch </DropdownMenuItem>

                  <Link href={"/dashboard"}>
                    <DropdownMenuItem>
                      <LayoutDashboardIcon />
                      Mon Dashboard
                      <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </Link>
                </div>
              }
              {
                !user?.publicMetadata.has_imported_channel && <div>
                  <Link href={"/dashboard"}>
                    <DropdownMenuItem><ImportIcon /> Importer ma chaine twitch </DropdownMenuItem>
                  </Link>

                </div>
              }
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="font-display text-xs select-none text-neutral-500 italic -mb-1">Gestion du compte</DropdownMenuLabel>
              <Link href="/profile">
                <DropdownMenuItem>
                  <UserIcon /> Profil & Sécurité
                </DropdownMenuItem>
              </Link>

              <SignOutButton>
                <DropdownMenuItem><DoorOpenIcon /> Déconnexion </DropdownMenuItem>
              </SignOutButton>
            </DropdownMenuContent>
          </DropdownMenu>
        </SignedIn>
      </SidebarFooter >
    </Sidebar >
  )
}

