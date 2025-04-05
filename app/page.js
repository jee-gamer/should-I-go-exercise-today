import Image from "next/image";
import Link from "next/link";
import '@/app/globals.css'

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-amber-50">
      <div className="flex flex-col items-center justify-center gap-16 mt-40 text-5xl text-black"> Should I go exercise today?
      </div>

        <div id="main" className="flex flex-row items-center justify-center gap-16 mt-20">

            <div id="recommendation" className="flex flex-col items-center justify-center gap-16 m-30 text-black">
                <div id="yesno" className="flex flex-col items-center justify-center gap-16 text-8xl">
                    YES
                </div>
                <div id="general" className="flex flex-col items-center justify-center gap-16 max-w-100">
                    Scenario: It’s a breezy, slightly overcast afternoon with a cool temperature.

                    Why you should exercise: The mild weather means you won’t overheat, and the breeze keeps you feeling fresh.
                    Overcast skies reduce glare and make outdoor workouts more comfortable.
                    Plus, the air feels crisp and energizing, making it the perfect time for a run, a long walk,
                    or even some bodyweight exercises at the park. You’ll feel refreshed and accomplished without battling extreme weather conditions.
                </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-16 m-30 text-black">
                <Image
                    src="/vercel.svg"
                    width={500}
                    height={500}
                    alt="Picture of the author"
                />
            </div>

        </div>

        <Link
          href="/api"
          className="flex flex-col items-center justify-center gap-16 bg-orange-200 text-black rounded-2xl p-2 hover:text-gray-600"
        >
          Go to API
        </Link>
    </div>
  );
}
