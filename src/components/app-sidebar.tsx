import { SignedOut, SignInButton, SignedIn, SignOutButton } from "@clerk/nextjs";
import { SidebarHeader, SidebarContent, SidebarGroup, SidebarFooter, Sidebar, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroupLabel } from "./ui/sidebar";
import { currentUser } from "@clerk/nextjs/server";
import { DoorOpenIcon, HomeIcon, ImportIcon, LayoutDashboardIcon, SquareArrowOutUpRightIcon, TvIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";

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
  {
    title: "Vtubers",
    icon: UserIcon,
    href: "/vtubers"
  },
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
        <div className="p-2">
          <div className="text-2xl font-display font-bold italic tracking-tighter select-none text-neutral-500 hover:text-neutral-400 transition-all">VtubeDex</div>
        </div>
      </SidebarHeader>
      <SidebarContent>
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
        <SidebarGroup>

          <SidebarGroupLabel>Mon Vtubedex</SidebarGroupLabel>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <div>
                <LayoutDashboardIcon />
                <span>Dashboard</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SignedOut>
          <SignInButton>
            <Button variant="ghost">Connexion</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <DropdownMenu>

            <DropdownMenuTrigger className="outline-none ring-none p-2">
              <div className="flex flex-col gap-2 w-full">
                <div className="flex flex-row items-center gap-2">
                  {user && <Image src={user.imageUrl} alt="userprofile" width={10} height={10} className="w-10 h-10 select-none rounded-full border-2 border-zinc-50/25 box-border" />
                  }<div className="flex flex-col items-start">
                    <div className="font-medium tracking-tight select-none">{user?.fullName}</div>
                    <div className="text-zinc-500 text-xs -mt-1 select-none">@{user?.username}</div>
                  </div>
                </div>
              </div>
            </DropdownMenuTrigger>
            {/* <SignOutButton /> */}
            <DropdownMenuContent sideOffset={6} className="w-60">
              <DropdownMenuLabel className="flex justify-center">{user?.fullName}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="font-display text-xs select-none text-neutral-500 italic -mb-1">Mon VtubeDex</DropdownMenuLabel>
              {
                !!user?.publicMetadata.has_imported_channel && <div>

                  <DropdownMenuItem><SquareArrowOutUpRightIcon /> Ma Chaine Twitch </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LayoutDashboardIcon />
                    Mon Dashboard
                    <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                  </DropdownMenuItem>
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

