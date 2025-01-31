export default function Home() {
  return (
    <div className="flex flex-col h-full w-full p-8 pt-12 gap-8 @container">
      <div className="flex flex-col justify-center items-center gap-0">
        <div className="flex h-1 transform scale-50 -mb-1">
          <div className="bg-blue-900 w-8" />
          <div className="bg-neutral-500 w-8" />
          <div className="bg-red-900 w-8" />
        </div>
        <h1 className="text-5xl font-extrabold tracking-tighter font-display italic text-neutral-800 select-none">
          Vtube<span className="text-neutral-700">Dex</span>
        </h1>
      </div>
      <div className="flex flex-col items-center">
        <div className="bg-neutral-900 h-80 @5xl:max-w-2/3 w-full rounded-xl"></div>
      </div>
    </div >
  );
}
