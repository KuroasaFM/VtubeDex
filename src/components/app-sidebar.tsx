import {
  SignedOut,
  SignInButton,
  SignedIn,
  SignOutButton,
} from "@clerk/nextjs";
import {
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarFooter,
  Sidebar,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupLabel,
} from "./ui/sidebar";
import { currentUser } from "@clerk/nextjs/server";
import {
  ChevronDown,
  ChevronsUpDown,
  DoorOpenIcon,
  HomeIcon,
  ImportIcon,
  LayoutDashboardIcon,
  MessageCircleQuestionIcon,
  SquareArrowOutUpRightIcon,
  StarsIcon,
  TvIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { env } from "process";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

const sidebarItems = [
  {
    title: "Home",
    icon: HomeIcon,
    href: "/",
  },
  {
    title: "Mes Oshi",
    icon: StarsIcon,
    href: "/oshi",
  },
  {
    title: "Streams",
    icon: TvIcon,
    href: "/streams",
  },
  {
    title: "Vtubers",
    icon: UserIcon,
    href: "/vtubers",
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
];
export async function AppSidebar() {
  const user = await currentUser();

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <Link href={"/"} className="flex items-end p-2">
          <div className="font-display text-2xl font-bold tracking-tighter text-neutral-500 italic transition-all select-none hover:text-neutral-400">
            VtubeDex
          </div>
          <Badge variant={"outline"} className="scale-90">
            αlpha
          </Badge>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {env.NODE_ENV == "development" && (
          <Badge variant={"outline"} className="scale-90 bg-orange-500">
            Development environment
          </Badge>
        )}
        <SidebarGroup>
          <SidebarMenu>
            {sidebarItems.map((item) => (
              <SidebarMenuItem key={item.title} className="-mb-1">
                <SidebarMenuButton asChild>
                  <Link href={item.href} className="">
                    <item.icon
                      className="text-neutral-500"
                      strokeWidth={2.2}
                      size={6}
                    />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SignedIn>
          {!!user?.publicMetadata.has_imported_channel && (
            <SidebarGroup>
              <SidebarGroupLabel>Mon Vtubedex</SidebarGroupLabel>
              <SidebarMenuItem className="list-none">
                <SidebarMenuButton asChild>
                  <Link href="/dashboard">
                    <LayoutDashboardIcon
                      size={6}
                      strokeWidth={2.2}
                      className="text-neutral-500"
                    />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarGroup>
          )}
        </SignedIn>
        <SidebarMenu>
          <Collapsible className="group/collapsible">
            <SidebarGroup>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger className="cursor-pointer hover:bg-neutral-800">
                  A Propos
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarMenuItem className="-mb-1">
                  <SidebarMenuButton asChild>
                    <Link href={"/faq"} className="">
                      <MessageCircleQuestionIcon
                        className="text-neutral-500"
                        strokeWidth={2.2}
                        size={6}
                      />
                      <span>F.A.Q.</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SignedOut>
          <SignInButton>
            <Button variant="pbr">Connexion</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <DropdownMenu>
            <DropdownMenuTrigger className="ring-none shadow-border-pbr flex cursor-pointer items-center rounded-lg p-3 outline-hidden transition-all hover:bg-neutral-950/20">
              <div className="flex w-full flex-col gap-2">
                <div className="flex flex-row items-center gap-2">
                  {user && (
                    <Image
                      src={user.imageUrl}
                      alt="userprofile"
                      width={100}
                      height={100}
                      className="box-border h-10 w-10 rounded-full border-2 border-zinc-50/25 select-none"
                    />
                  )}
                  <div className="flex flex-col items-start">
                    <div className="font-medium tracking-tight select-none">
                      {user?.fullName}
                    </div>
                    <div className="-mt-1 text-xs text-zinc-500 select-none">
                      @{user?.username}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <ChevronsUpDown size={14} className="text-neutral-500" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent sideOffset={6} className="w-60">
              <DropdownMenuLabel className="flex justify-center">
                {user?.fullName}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="font-display -mb-1 text-xs text-neutral-500 italic select-none">
                Mon VtubeDex
              </DropdownMenuLabel>
              {!!user?.publicMetadata.has_imported_channel && (
                <div>
                  <DropdownMenuItem>
                    <SquareArrowOutUpRightIcon /> Ma Chaine Twitch{" "}
                  </DropdownMenuItem>

                  <Link href={"/dashboard"}>
                    <DropdownMenuItem>
                      <LayoutDashboardIcon />
                      Mon Dashboard
                      <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </Link>
                </div>
              )}
              {!user?.publicMetadata.has_imported_channel && (
                <div>
                  <Link href={"/dashboard"}>
                    <DropdownMenuItem>
                      <ImportIcon /> Importer ma chaine twitch{" "}
                    </DropdownMenuItem>
                  </Link>
                </div>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="font-display -mb-1 text-xs text-neutral-500 italic select-none">
                Gestion du compte
              </DropdownMenuLabel>
              <Link href="/profile">
                <DropdownMenuItem>
                  <UserIcon /> Profil & Sécurité
                </DropdownMenuItem>
              </Link>

              <SignOutButton>
                <DropdownMenuItem>
                  <DoorOpenIcon /> Déconnexion{" "}
                </DropdownMenuItem>
              </SignOutButton>
            </DropdownMenuContent>
          </DropdownMenu>
        </SignedIn>
      </SidebarFooter>
    </Sidebar>
  );
}
