import { UserProfile } from "@clerk/nextjs";

export default function Profile() {
  return (
    <div className="flex h-screen items-center justify-center">
      <UserProfile />
    </div>
  );
}
