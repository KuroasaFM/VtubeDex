import { UserProfile } from "@clerk/nextjs";

export default function Profile() {
  return <div className="flex justify-center items-center h-screen">
    <UserProfile />
  </div>
}
