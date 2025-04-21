'use client';

import Image from "next/image";
import Link from "next/link";
import '@/app/globals.css'
import axios from "axios";

import { CaveatBrush_font, PM_font, WinkySans_font } from "@/app/Fonts";

import { useEffect, useState } from "react";

export default function Home() {
	const [temp, setTemp] = useState({value: 0, desc: "Not loaded"});
	const [tempColor, setTempColor] = useState("");
	const [humid, setHumid] = useState({value: 0, desc: "Not loaded"});
	const [pm25, setPm25] = useState({value: 0, desc: "Not loaded"});
	const [people, setPeople] = useState({value: 0, desc: "Not loaded"});
	const [remark, setRemark] = useState("bad");
	const [picture, setPicture] = useState("/bad/sad.png");
	const [suggestions, setSuggestions] = useState({suggestion: "hmm?", desc1: "Whoops. It seems like the suggestion isn't loaded yet", desc2: "Try refreshing the page"});
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
					const { suggestion, desc1, desc2, remark, weather } = response.data;
					setSuggestions({
						suggestion: suggestion,
						desc1: desc1,
						desc2: desc2,
					});

					setTemp(weather.temperature);
					setHumid(weather.humidity);
					setPm25(weather.pm2_5);
					setPeople(weather.people);

					setRemark(remark);
			})
		}

		try {
			get_suggestion();
		} catch (error) {
			console.log(`Failed to get suggestion ${error}`);
		}

		// Add getting weather attribute and setting them here
	}, [time]);

	useEffect(() => {
		if (temp.value <= 26) setTempColor("text-blue-500");
		else if (temp.value <= 30) setTempColor("text-yellow-500");
		else if (temp.value <= 35) setTempColor("text-orange-500");
		else setTempColor("text-red-800");
	}, [temp])

	useEffect(() => {
		const get_and_set_image = async () => {
			const picturePath = await axios.get(`/api/random-image`, {
				params: {folderName: remark}
			})
			console.log(picturePath.data.picturePath)
			setPicture(picturePath.data.picturePath);
		}
		get_and_set_image();
	}, [remark])

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
						{suggestions.desc1}
						<br/>
						<br/>
						{suggestions.desc2}
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
						src={picture}
						width={ 350 }
						height={ 350 }
						alt="Stickman"
						className="absolute top-40 left-30"
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
							<span id="temperature" className={`${ WinkySans_font.className } ${tempColor} attribute-text`}>{ temp.value }</span>
							<span className={`${ WinkySans_font.className } ${tempColor} text-2xl xl:text-5xl mb-4`}>°C</span>
						</div>
					</div>
					<span className={`${ WinkySans_font.className } attribute-desc mt-5`}>{ temp.desc }</span>
				</div>

				<div className="flex-width">
					<div className="attribute-box">
						<span className={`${CaveatBrush_font.className} attribute-title`}>💦 Humidity</span>
						<div className="flex flex-row items-end text-blue-500">
							<span id="humidity" className={`${ WinkySans_font.className } attribute-text`}>{ humid.value }</span>
							<span className={`${ WinkySans_font.className } text-2xl xl:text-6xl mb-4`}>%</span>
						</div>
					</div>
					<span className={`${ WinkySans_font.className } attribute-desc mt-5`}>{ humid.desc }</span>
				</div>

				<div className="flex-width">
					<div className="attribute-box">
						<span className={`${CaveatBrush_font.className} font-bold text-3xl 4xl:text-5xl`}>😶‍🌫 PM 2.5 (AQI)</span>
						<span id="pm25" className={`${ WinkySans_font.className } attribute-text text-gray-500`}>{ pm25.value }</span>
					</div>
					<span className={`${ WinkySans_font.className } attribute-desc mt-5`}>{ pm25.desc }</span>
				</div>

				<div className="flex-width">
					<div id="people" className="attribute-box">
						<span className={`${CaveatBrush_font.className} attribute-title`}>👨‍👨 People</span>
						<div className="flex flex-row items-end">
							<span id="people" className={`${ WinkySans_font.className } attribute-text`}>{ people.value }</span>
							<span className={`${ WinkySans_font.className } text-2xl xl:text-6xl mb-4`}>%</span>
						</div>
					</div>
					<span className={`${ WinkySans_font.className } attribute-desc mt-5`}>{ people.desc }</span>
					<span className={`${ WinkySans_font.className } text-1xl 4xl:text-2xl mt-5 text-gray-500`}>* This is only a prediction</span>
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
