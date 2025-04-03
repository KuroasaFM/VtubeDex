"use client";

import { LoaderCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "~/components/ui/input";
import { type Vtuber } from "~/server/api/schemas/vtuber";
import { api } from "~/trpc/react";
import { useDebounce } from "@uidotdev/usehooks";
import VtuberList from "~/components/ui/vtuberList";

interface VtuberSearchProps {
  vtubers: (Vtuber & { is_oshi?: boolean })[];
}

export default function VtuberSearch(props: VtuberSearchProps) {
  const [search, setSearch] = useState("");
  const [vtubers, setVtubers] = useState(props.vtubers);

  const debouncedSearch = useDebounce(search, 300);

  const { data, isLoading } = api.vtuber.search.useQuery({
    search: debouncedSearch,
  });

  useEffect(() => {
    if (data) setVtubers(data);
  }, [data]);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Input
          onInput={(e) => setSearch(e.currentTarget.value)}
          placeholder="Chercher un Vtuber ..."
          className="placeholder:text-neutral-700 placeholder:italic focus-visible:border-neutral-700 focus-visible:ring-transparent"
        />
      </div>
      {!!isLoading && (
        <div className="flex items-center justify-center text-neutral-800">
          <LoaderCircleIcon className="animate-spin" />
        </div>
      )}
      {!isLoading && <VtuberList vtubers={vtubers} />}
    </div>
  );
}
