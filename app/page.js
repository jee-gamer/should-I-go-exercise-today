'use client';

import Image from "next/image";
import Link from "next/link";
import '@/app/globals.css'

import { CaveatBrush_font, PM_font, WinkySans_font } from "@/app/Fonts";

import { useEffect, useState } from "react";

export default function Home() {
	const [temp, setTemp] = useState(31); // temp here
	const [tempColor, setTempColor] = useState("");

	useEffect(() => {
		if (temp <= 26) setTempColor("text-blue-500");
		else if (temp <= 30) setTempColor("text-yellow-500");
		else if (temp <= 35) setTempColor("text-orange-500");
		else setTempColor("text-red-800");
	}, [temp])

  return (
    <div className="relative flex flex-col items-center justify-items	-center min-h-fit w-full max-w-screen sm:p-20 font-[family-name:var(--font-geist-sans)] notebook overflow-x-hidden z-0">
			<Image
				src="/dumbbell2Outline.png"
				width={ 900 }
				height={ 900 }
				alt="Dumbbell"
				className="absolute rotate-60 transform translate-x-260 translate-y-50"
			/>
			<Image
				src="/pencil2.png"
				width={ 700 }
				height={ 700 }
				alt="Wood Sign"
				className="absolute transform -translate-x-220 translate-y-90 -rotate-80"
			/>
			<Image
				src="/eraser1.png"
				width={ 300 }
				height={ 300 }
				alt="Wood Sign"
				className="absolute transform -translate-x-210 translate-y-220"
			/>
      <div className={`flex flex-col items-center justify-center gap-16 mt-40 text-8xl text-black text-outline ${CaveatBrush_font.className}`}> Should I go exercise right now?
      </div>

			<div id="main" className="flex flex-row items-center justify-center gap-16 min-w-[1304px]">

				<div id="recommendation"
						 className="flex flex-col items-center justify-items-start gap-16 m-30 min-w-[400px] min-h-[500px] max-h-[500px] text-black">
					<div id="yesno"
							 className={ `flex flex-col gap-16 text-9xl mt-10 text-outline ${ PM_font.className }` }>
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
						alt="Stickman"
						className="absolute top-18 left-13"
					/>
				</div>

			</div>

			<Link
				href="/api"
				className={`relative flex flex-col items-center justify-center min-w-100 max-w-200 gap-16 mt-10 text-5xl text-black rounded-2xl p-2 hover:text-gray-600 hover:opacity-70 ${ PM_font.className }`}
			>
				Go to API
				<Image
					src="/drawnCircle.png"
					width={ 500 }
					height={ 100 }
					alt="Drawn Circle"
					className="absolute -top-15 -left-5 min-w-100"
				/>
			</Link>



			<div id="attributes" className="flex f	lex-row items-center justify-center min-w-full min-h-1/4 gap-[5vw] mt-30 mb-30 border">
				<div className="normal-flex">
					<div className="attribute-box">
						<span className={`${CaveatBrush_font.className} attribute-title border`}>🌡️ Temperature</span>
						<div className="flex flex-row items-end">
							<span id="temperature" className={`${ WinkySans_font.className } ${tempColor} attribute-text`}>{ temp }</span>
							<span id="temperature" className={`${ WinkySans_font.className } ${tempColor} text-2xl xl:text-5xl mb-4`}>°C</span>
						</div>
					</div>
					<span className={`${ WinkySans_font.className } text-4xl mt-5`}>High Risk of heat stroke</span>
				</div>

				<div className="normal-flex">
					<div className="attribute-box">
						<span className={`${CaveatBrush_font.className} attribute-title border`}>🌡️ Temperature</span>
						<span id="humidity" className={`${ WinkySans_font.className } attribute-text`}>21 °C</span>
					</div>
					<span className={`${ WinkySans_font.className } text-4xl mt-5`}>High Risk of heat stroke</span>
				</div>

				<div className="normal-flex">
					<div className="attribute-box">
						<span className={`${CaveatBrush_font.className} attribute-title border`}>🌡️ Temperature</span>
						<span id="pm2.5" className={`${ WinkySans_font.className } attribute-text`}>21 °C</span>
					</div>
					<span className={`${ WinkySans_font.className } text-4xl mt-5`}>High Risk of heat stroke</span>
				</div>

				<div className="normal-flex">
					<div id="people" className="attribute-box">
						<span className={`${CaveatBrush_font.className} attribute-title border`}>🌡️ Temperature</span>
						<span id="people" className={`${ WinkySans_font.className } attribute-text`}>21 °C</span>
					</div>
					<span className={`${ WinkySans_font.className } text-4xl mt-5`}>High Risk of heat stroke</span>
				</div>

			</div>

		</div>
  );
}
