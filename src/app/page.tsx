"use client";

import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton, UserProfile, useUser } from "@clerk/nextjs";
import { SidebarProvider } from "~/components/ui/sidebar";


export default function Home() {


  return (
      <div className="flex flex-col justify-center items-center h-full w-full">
        <h1 className="text-5xl font-extrabold tracking-tight">
          VtubeDex
        </h1>
      </div>
  );
}
