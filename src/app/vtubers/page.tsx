import VtuberSearch from "./components/vtuberSearch";

export const metadata = {
  title: "Vtubers | VtubeDex",
};

export default async function Vtubers() {
  return (
    <div className="@container container mx-auto flex flex-col gap-4 px-8">
      <div className="mt-2 mb-2 flex grow items-center justify-center text-xl">
        <span className="font-display font-bold italic select-none">
          Vtubers
        </span>
      </div>
      <VtuberSearch vtubers={[]} />
    </div>
  );
}
