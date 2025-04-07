import Image from "next/image";
import Link from "next/link";
import '@/app/globals.css'

import { CaveatBrush_font, PM_font, WinkySans_font } from "@/app/Fonts";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-items-center min-h-fit min-w-fit sm:p-20 font-[family-name:var(--font-geist-sans)] notebook overflow-hidden">
			<Image
				src="/dumbbell1.png"
				width={ 900 }
				height={ 900 }
				alt="Picture of the author"
				className="absolute rotate-60 transform translate-x-270 -translate-y-30"
			/>
      <div className={`flex flex-col items-center justify-center gap-16 mt-40 text-8xl text-black ${CaveatBrush_font.className}`}> Should I go exercise right now?
      </div>

			<div id="main" className="flex flex-row items-center justify-center gap-16">

				<div id="recommendation"
						 className="flex flex-col items-center justify-items-start gap-16 m-30 min-w-[400px] min-h-[500px] max-h-[500px] text-black">
					<div id="yesno"
							 className={ `flex flex-col gap-16 text-9xl mt-10 ${ PM_font.className }` }>
						YES
					</div>
					<div id="general"
							 className={ `flex flex-col items-center justify-center gap-16 max-w-100 text-3xl ${ WinkySans_font.className }` }>
						The mild weather means you won’t overheat, and the breeze keeps you
						feeling fresh.
						<br/>
						<br/>
						It’s a breezy, slightly overcast afternoon with a cool temperature.
					</div>
				</div>

				<div
					className="relative flex flex-col items-center justify-center gap-16 text-black">
					<Image
						src="/pinNote2.png"
						width={ 600 }
						height={ 600 }
						alt="Picture of the author"
					/>
					<Image
						src="/flowerTest.png"
						width={ 500 }
						height={ 500 }
						alt="Picture of the author"
						className="absolute top-18 left-13"
					/>
				</div>

			</div>

			<Link
				href="/api"
				className={`relative flex flex-col items-center justify-center min-w-1/6 gap-16 mt-10 text-5xl text-black rounded-2xl p-2 hover:text-gray-600 ${ PM_font.className }`}
			>
				Go to API
				<Image
					src="/drawnCircle.png"
					width={ 500 }
					height={ 100 }
					alt="Drawn Circle"
					className="absolute -top-15 -left-5"
				/>
			</Link>



			<div id="attributes" className="flex flex-row items-center justify-center min-w-full min-h-1/4 gap-[5vw] mt-30 mb-30 border">
				<div className="normal-flex">
					<div id="temperature" className="attribute-box">
						<span className={`${CaveatBrush_font.className} attribute-title border`}>🌡️ Temperature</span>
						<span className={`${ WinkySans_font.className } text-9xl`}>21 °C</span>
					</div>
					<span className={`${ WinkySans_font.className } text-4xl mt-5`}>High Risk of heat stroke</span>
				</div>

				<div className="normal-flex">
					<div id="humidity" className="attribute-box">
						<span className={`${CaveatBrush_font.className} attribute-title border`}>🌡️ Temperature</span>
						<span className={`${ WinkySans_font.className } text-9xl`}>21 °C</span>
					</div>
					<span className={`${ WinkySans_font.className } text-4xl mt-5`}>High Risk of heat stroke</span>
				</div>

				<div className="normal-flex">
					<div id="pm2.5" className="attribute-box">
						<span className={`${CaveatBrush_font.className} attribute-title border`}>🌡️ Temperature</span>
						<span className={`${ WinkySans_font.className } text-9xl`}>21 °C</span>
					</div>
					<span className={`${ WinkySans_font.className } text-4xl mt-5`}>High Risk of heat stroke</span>
				</div>

				<div className="normal-flex">
					<div id="people" className="attribute-box">
						<span className={`${CaveatBrush_font.className} attribute-title border`}>🌡️ Temperature</span>
						<span className={`${ WinkySans_font.className } text-9xl`}>21 °C</span>
					</div>
					<span className={`${ WinkySans_font.className } text-4xl mt-5`}>High Risk of heat stroke</span>
				</div>

			</div>

    </div>
  );
}
