import { SignedOut, SignInButton, SignedIn, SignOutButton, useUser } from "@clerk/nextjs";
import { SidebarHeader, SidebarContent, SidebarGroup, SidebarFooter, Sidebar, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "./ui/sidebar";
import { currentUser } from "@clerk/nextjs/server";

  const sidebarItems = [
    {
      title: "Home",
    //   icon: <HomeIcon />,
      href: "/",
    },
  ]
  export async function AppSidebar() {

    const user = await currentUser();
    
    return (
      <Sidebar variant="inset">
        <SidebarHeader>
            <div>
                <div className="text-xl font-bold tracking-tight">VtubeDex</div>            
            </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup >
            <SidebarMenu>
                {sidebarItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton>
                            {item.title}
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup />
        </SidebarContent>
        <SidebarFooter>
            <div>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center gap-2">
                <img src={user?.imageUrl} className="w-10 h-10 select-none rounded-full border-2 border-zinc-50/25 box-border" />
                <div className="flex flex-col">
                  <div className="font-medium tracking-tight select-none">{user?.fullName}</div>
                  <div className="text-zinc-500 text-xs -mt-1 select-none">@{user?.username}</div>
                </div>
              </div>
              {/* <SignOutButton /> */}
            </div>
          </SignedIn>
            </div>
        </SidebarFooter>
      </Sidebar>
    )
  }
  