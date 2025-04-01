import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-amber-50">
      <div className="flex flex-col items-center justify-center gap-16 mt-40 text-5xl text-black"> Should I go exercise today</div>
    </div>
  );
}
