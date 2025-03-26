/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { ClerkProvider } from "@clerk/nextjs";
import { AppSidebar } from "~/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "~/components/ui/sidebar";
import { UserStoreProvider } from "~/providers/user-store-provider";
import { api } from "~/trpc/server";
import { currentUser } from "@clerk/nextjs/server";
import { type Vtuber } from "~/server/api/schemas/vtuber";

import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "VtubeDex",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = await currentUser();

  let vtuber: Vtuber | null = null;
  if (user?.username && user.publicMetadata.has_imported_channel) {
    vtuber = await api.vtuber.findOne({ login: user.username });
    vtuber = { ...vtuber, id: JSON.stringify(vtuber.id) };
  }

  return (
    <ClerkProvider>
      <html lang="en" className={`${GeistSans.variable} dark`}>
        <head>
          <link rel="stylesheet" href="https://use.typekit.net/yax3yrb.css" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Funnel+Display:wght@300..800&display=swap"
            rel="stylesheet"
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </head>
        <body>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <SidebarTrigger className="absolute m-2" />
              <TRPCReactProvider>
                <UserStoreProvider current_vtuber={vtuber}>
                  <div className="h-full overflow-y-scroll bg-gradient-to-tl from-neutral-900/50 to-transparent">
                    {children}
                  </div>
                  <SpeedInsights />
                </UserStoreProvider>
              </TRPCReactProvider>
            </SidebarInset>
          </SidebarProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
