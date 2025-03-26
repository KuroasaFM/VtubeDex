import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <LoaderCircle
        className="animate-spin text-neutral-700"
        height={64}
        width={64}
        markerWidth={2}
      />
    </div>
  );
}
