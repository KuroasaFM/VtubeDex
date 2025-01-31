import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return <div className="h-full w-full flex justify-center items-center">
    <LoaderCircle className="animate-spin text-neutral-700" height={64} width={64} markerWidth={2} />
  </div>
}
