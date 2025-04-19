'use client';

import Image from "next/image";
import Link from "next/link";
import '@/app/globals.css'
import axios from "axios";

import { CaveatBrush_font, PM_font, WinkySans_font } from "@/app/Fonts";

import { useEffect, useState } from "react";

export default function Home() {
	const [temp, setTemp] = useState(0); // temp here
	const [tempColor, setTempColor] = useState("");
	const [humid, setHumid] = useState(0); // temp here
	const [pm25, setPm25] = useState(0); // temp here
	const [people, setPeople] = useState(0); // temp here
	const [suggestions, setSuggestions] = useState({suggestion: "hmm?", description: "Whoops. It seems like the suggestion isn't loaded yet"});
	let [time, setTime] = useState("now");

	useEffect(() => {
		if (time === "Late Afternoon") {
			time = "late-afternoon";
		}
		const get_suggestion = async () => {
			await axios.get(`/api/suggestion`, {
				params: {time: time},
			})
				.then((response) => {
					console.log(response.data);
				setSuggestions(response.data);
			})
		}
		get_suggestion();

		// Add getting weather attribute and setting them here
	}, [time]);

	useEffect(() => {
		if (temp <= 26) setTempColor("text-blue-500");
		else if (temp <= 30) setTempColor("text-yellow-500");
		else if (temp <= 35) setTempColor("text-orange-500");
		else setTempColor("text-red-800");
	}, [temp])

	useEffect(() => {
		// To change to prediction when set new time
	}, [time])

  return (
    <div className="relative flex flex-col items-center justify-items-center min-h-fit w-full max-w-screen sm:p-20 font-[family-name:var(--font-geist-sans)] notebook overflow-x-hidden z-0 text-black">
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
				className="absolute transform -translate-x-220 translate-y-70 -rotate-80"
			/>
			<Image
				src="/eraser1.png"
				width={ 300 }
				height={ 300 }
				alt="Wood Sign"
				className="absolute transform -translate-x-210 translate-y-200"
			/>
			<span className={`flex flex-col items-center justify-center gap-16 mt-20 text-8xl text-black text-outline ${CaveatBrush_font.className}`}>Should I go exercise today?</span>
			<span id='currentTime' className={`text-4xl ${WinkySans_font.className} text-gray-500 mt-10 `}>time - {time}</span>

			<div id="main" className="flex flex-row items-center justify-center gap-16 min-w-[1304px]">

				<div id="recommendation"
						 className="flex flex-col items-center justify-items-start gap-16 m-30 mt-10 min-w-[400px] min-h-[500px] max-h-[500px] text-black">
					<div id="yesno"
							 className={ `flex flex-col gap-16 text-9xl mt-10 text-outline ${ PM_font.className }` }>
						{suggestions.suggestion.toUpperCase()}
					</div>
					<div id="general"
							 className={ `flex flex-col items-center justify-center gap-16 max-w-100 text-3xl ${ WinkySans_font.className }` }>
						{suggestions.description}
						<br/>
						<br/>
						{suggestions.description}
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

			{/*TIME BUTTONS*/}
			<div id="time" className="flex flex-col items-center justify-items-start min-w-full h-4/5 mt-20">
				<span className={`text-5xl ${CaveatBrush_font.className}`}>Don&#39;t want to exercise now? Tell us when</span>
				<div id="buttons" className="flex flex-row items-center justify-center min-w-full h-full gap-10 mt-10">
					<div name="button" className="flex-width-time h-full">
						<button className={`time-button bg-gradient-to-r from-blue-900 to-blue-200`}
						onClick={() => setTime("Dawn")}>
							<span className={`${CaveatBrush_font.className} text-blue-900`}>Dawn</span>
						</button>
						<span className={`text-4xl ${WinkySans_font.className} text-gray-500`}>07:00 - 09:00</span>
					</div>
					<div name="button" className="flex-width-time h-full">
						<button className={`time-button bg-gradient-to-r from-blue-200 to-yellow-200`}
										onClick={() => setTime("Morning")}>
							<span className={`${CaveatBrush_font.className} text-blue-900`}>Morning</span>
						</button>
						<span className={`text-4xl ${WinkySans_font.className} text-gray-500`}>09:00 - 11:00</span>
					</div>
					<div name="button" className="flex-width-time h-full">
						<button className={`time-button bg-gradient-to-r from-yellow-200 to-yellow-500`}
										onClick={() => setTime("Noon")}>
							<span className={`${CaveatBrush_font.className} text-blue-900`}>Noon</span>
						</button>
						<span className={`text-4xl ${WinkySans_font.className} text-gray-500`}>11:00 - 13:00</span>
					</div>
					<div name="button" className="flex-width-time h-full">
						<button className={`time-button bg-gradient-to-r from-yellow-500 to-orange-500`}
										onClick={() => setTime("Afternoon")}>
							<span className={`${CaveatBrush_font.className} text-blue-900`}>Afternoon</span>
						</button>
						<span className={`text-4xl ${WinkySans_font.className} text-gray-500`}>13:00 - 15:00</span>
					</div>
					<div name="button" className="flex-width-time h-full">
						<button className={`time-button bg-gradient-to-r from-orange-500 to-blue-200`}
										onClick={() => setTime("Late Afternoon")}>
							<span className={`${CaveatBrush_font.className} text-blue-900`}>Late Afternoon</span>
						</button>
						<span className={`text-4xl ${WinkySans_font.className} text-gray-500`}>15:00 - 17:00</span>
					</div>
				</div>
			</div>

			{/*ATTRIBUTE BOXES*/}
			<div id="attributes" className="flex flex-row items-start justify-center min-w-full min-h-1/4 gap-[5vw] mt-50 mb-30">

				<div className="flex-width">
					<div className="attribute-box">
						<span className={`${CaveatBrush_font.className} attribute-title`}>🌡️ Temperature</span>
						<div className="flex flex-row items-end">
							<span id="temperature" className={`${ WinkySans_font.className } ${tempColor} attribute-text`}>{ temp }</span>
							<span className={`${ WinkySans_font.className } ${tempColor} text-2xl xl:text-5xl mb-4`}>°C</span>
						</div>
					</div>
					<span className={`${ WinkySans_font.className } text-3xl 4xl:text-4xl mt-5`}>Moderate Risk of heat stroke</span>
				</div>

				<div className="flex-width">
					<div className="attribute-box">
						<span className={`${CaveatBrush_font.className} attribute-title`}>💦 Humidity</span>
						<div className="flex flex-row items-end text-blue-500">
							<span id="humidity" className={`${ WinkySans_font.className } attribute-text`}>{ humid }</span>
							<span className={`${ WinkySans_font.className } text-2xl xl:text-6xl mb-4`}>%</span>
						</div>
					</div>
					<span className={`${ WinkySans_font.className } text-3xl 4xl:text-4xl mt-5`}>Hard to cooldown</span>
				</div>

				<div className="flex-width">
					<div className="attribute-box">
						<span className={`${CaveatBrush_font.className} font-bold text-3xl 4xl:text-5xl`}>😶‍🌫 PM 2.5 (AQI)</span>
						<span id="pm25" className={`${ WinkySans_font.className } attribute-text text-gray-500`}>{ pm25 }</span>
					</div>
					<span className={`${ WinkySans_font.className } text-3xl 4xl:text-4xl mt-5`}>Perfectly fine to go out</span>
				</div>

				<div className="flex-width">
					<div id="people" className="attribute-box">
						<span className={`${CaveatBrush_font.className} attribute-title`}>👨‍👨 People</span>
						<div className="flex flex-row items-end">
							<span id="people" className={`${ WinkySans_font.className } attribute-text`}>{ people }</span>
							<span className={`${ WinkySans_font.className } text-2xl xl:text-6xl mb-4`}>%</span>
						</div>
					</div>
					<span className={`${ WinkySans_font.className } text-3xl 4xl:text-4xl mt-5`}>Barely anyone might come</span>
				</div>

			</div>

			<Link
				id="api"
				href="/api"
				className={`relative flex flex-col items-center justify-center min-w-100 max-w-200 gap-16 mt-10 mb-40 text-5xl text-black rounded-2xl p-2 hover:text-gray-600 hover:opacity-70 ${ PM_font.className }`}
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

			<div className="flex flex-col items-start justify-items-center">
				<span id='currentTime' className={`text-2xl ${WinkySans_font.className} text-gray-500 mt-10 `}>* If location is not provided we will use location of Kasetsart University at Bangkhen</span>
				<span id='currentTime' className={`text-2xl ${WinkySans_font.className} text-gray-500 mt-5 `}>* The people prediction is only available through 7:00-17:00</span>
			</div>

		</div>
  );
}
