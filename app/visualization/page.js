'use client';

import {useEffect, useRef, useState} from 'react';
import createChart from "@/lib/Graph";

import '@/app/globals.css'

import { CaveatBrush_font, PM_font, WinkySans_font } from "@/app/Fonts";

export default function Visualization() {
	const [time, setTime] = useState("Dawn");
	const [weather, setWeather] = useState("Temperature");

	useEffect(() => {
		console.log(`Changed time to ${time}`)
	}, [time])

	useEffect(() => {
		console.log(`Changed weather attribute to ${weather}`)
	}, [weather])

	const tempPeople = useRef(null);
	const humidPeople = useRef(null);
	const rainPeople = useRef(null);
	const pm25People = useRef(null);

	useEffect(() => {
		const ctx = tempPeople.current?.getContext('2d');

		if (!ctx) return;

		const X = ['25', '31', '32', '33', '40'];
		const xLabel = "Temperature (°C)"
		const Y = [12, 19, 3, 5, 8];
		const yLabel = "People"

		const chart = createChart(ctx,X, Y, xLabel, yLabel);

		return () => chart.destroy(); // cleanup on unmount
	}, []);

	useEffect(() => {
		const ctx = humidPeople.current?.getContext('2d');

		if (!ctx) return;

		const X = ['78', '50', '90', '81', '76'];
		const xLabel = "Humidity (%)"
		const Y = [12, 19, 3, 5, 8];
		const yLabel = "People"

		const chart = createChart(ctx,X, Y, xLabel, yLabel);

		return () => chart.destroy(); // cleanup on unmount
	}, []);

	useEffect(() => {
		const ctx = rainPeople.current?.getContext('2d');

		if (!ctx) return;

		const X = ['78', '50', '90', '81', '76'];
		const xLabel = "Precip (mm)"
		const Y = [12, 19, 3, 5, 8];
		const yLabel = "People"

		const chart = createChart(ctx,X, Y, xLabel, yLabel);

		return () => chart.destroy(); // cleanup on unmount
	}, []);

	useEffect(() => {
		const ctx = pm25People.current?.getContext('2d');

		if (!ctx) return;

		const X = ['78', '50', '90', '81', '76'];
		const xLabel = "PM 2.5 (μg/m3)"
		const Y = [12, 19, 3, 5, 8];
		const yLabel = "People"

		const chart = createChart(ctx,X, Y, xLabel, yLabel);

		return () => chart.destroy(); // cleanup on unmount
	}, []);



	return (
		<div className="flex flex-col items-center justify-items-center min-h-fit h-screen sm:p-20 font-[family-name:var(--font-geist-sans)] text-black notebook-wo-line">
			<div id="main" className="flex flex-col items-center justify-items-start min-w-full min-h-screen border">
				<span className={`text-9xl ${CaveatBrush_font.className} mt-10 text-outline`}> Visualization </span>
				<span className={`inline-block text-left text-4xl ${WinkySans_font.className} mt-20 w-5/6`}> Relationship Graph between people and weather</span>

				<div className="flex flex-row items-center justify-center w-5/6 gap-16 mt-20">
					<span className={`flex justify-center w-1/2 text-3xl mb-5 ${WinkySans_font.className}`}> Temperature</span>
					<span className={`flex justify-center w-1/2 text-3xl mb-5 ${WinkySans_font.className}`}> Humidity</span>
				</div>

				<div id="graph1" className="flex flex-row items-start justify-center w-5/6 h-[30vh] gap-16 border">
					<div className="w-1/2 h-full">
						<canvas className="bg-white" ref={tempPeople}></canvas>
					</div>
					<div className="w-1/2 h-full">
						<canvas className="bg-white" ref={humidPeople}></canvas>
					</div>
				</div>

				<div className="flex flex-row items-center justify-center w-5/6 gap-16 mt-20">
					<span className={`flex justify-center w-1/2 text-3xl mb-5 ${WinkySans_font.className}`}> Rain</span>
					<span className={`flex justify-center w-1/2 text-3xl mb-5 ${WinkySans_font.className}`}> PM 2.5</span>
				</div>

				<div id="graph2" className="flex flex-row items-start justify-center w-5/6 h-[30vh] gap-16 border">
					<div className="w-1/2 h-full">
						<canvas className="bg-white" ref={rainPeople}></canvas>
					</div>
					<div className="w-1/2 h-full">
						<canvas className="bg-white" ref={pm25People}></canvas>
					</div>
				</div>

				<span className={`inline-block text-left text-4xl ${WinkySans_font.className} mt-20 w-5/6`}> Relationship Graph between people and weather (time interval)</span>
				<div id="dropdown" className="flex flex-col items-start w-5/6 mt-20 gap-7">
					<label className="select">
						<span className="label">Time</span>
						<select value={time} onChange={e => setTime(e.target.value)}>
							<option>Dawn</option>
							<option>Morning</option>
							<option>Noon</option>
							<option>Afternoon</option>
							<option>Late Afternoon</option>
						</select>
					</label>
					<label className="select">
						<span className="label">Weather attribute</span>
						<select>
							<option>Temperature</option>
							<option>Humidity</option>
							<option>Precip_mm</option>
							<option>PM 2.5</option>
						</select>
					</label>
				</div>

				<div
					className="flex flex-row items-center justify-center w-5/6 h-[30vh] gap-16 mt-20 border">
				{/*	Put your graph here Putter, How you get the data from the Time and Weather value is up to you */}
				</div>

				<span className={`inline-block text-left text-4xl ${WinkySans_font.className} mt-20 w-5/6`}> More fucking graph..</span>

			</div>
		</div>
	)
}