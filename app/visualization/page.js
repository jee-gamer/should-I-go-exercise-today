'use client';

import {useEffect, useState} from 'react';
import {BarChart, LineChart} from "@/lib/CanvasMaker";

import '@/app/globals.css'

import { CaveatBrush_font, PM_font, WinkySans_font } from "@/app/Fonts";
import axios from "axios";

export default function Visualization() {
	const [time, setTime] = useState("Dawn");
	const [weather, setWeather] = useState("Temperature");

	useEffect(() => {
		console.log(`Changed time to ${time}`)
	}, [time])

	useEffect(() => {
		console.log(`Changed weather attribute to ${weather}`)
	}, [weather])

	const [allTemp, setAllTemp] = useState({});
	const [allHumid, setAllHumid] = useState({});
	const [allPm25, setAllPm25] = useState({});
	const [allPrecip, setAllPrecip] = useState({});

	useEffect(() => {
		const getData = async () => {
			const peopleRes = await axios.get('/api/all-people');
			const tempRes = await axios.get('/api/all-temperature');

			const people = peopleRes.data.result;
			const temps = tempRes.data.result;

			// Pair people and temps together by index
			const combined = people.map((person, index) => ({
				person,
				temp: temps[index]
			}));

			// Sort by temperature (ascending)
			combined.sort((a, b) => a.temp - b.temp);

			// Split them back into separate arrays
			const sortedPeople = combined.map(item => item.person);
			const sortedTemps = combined.map(item => item.temp);

			setAllTemp({
				temp: sortedTemps,
				people: sortedPeople
			});
		};

		getData();
	}, []);


	useEffect(() => {

		const getAllTemp = async () => {
			await axios.get('/api/all-temperature')
				.then((response) => {
					setAllTemp(response.data.result);
				});
		};

		const getAllHumid = async () => {
			await axios.get('/api/all-humidity')
				.then((response) => {
					setAllHumid(response.data.result);
				});
		};

		const getAllPm25 = async () => {
			await axios.get('/api/all-pm25')
				.then((response) => {
					setAllPm25(response.data.result);
				});
		};

		const getAllPrecip = async () => {
			await axios.get('/api/all-precip')
				.then((response) => {
					setAllPrecip(response.data.result);
				});
		};

		getAllTemp();
		getAllHumid();
		getAllPm25();
		getAllPrecip();
	}, []);


	return (
		<div className="flex flex-col items-center justify-items-center min-h-fit h-screen sm:p-20 font-[family-name:var(--font-geist-sans)] text-black notebook-wo-line">
			<div id="main" className="flex flex-col items-center justify-items-start min-w-full min-h-screen">
				<span className={`text-9xl ${CaveatBrush_font.className} mt-10 text-outline`}> Visualization </span>
				<span className={`inline-block text-left text-4xl ${WinkySans_font.className} mt-20 w-5/6 mb-15`}> Relationship Graph between people and weather</span>

				<div id="graph1" className="flex flex-row items-start justify-center w-5/6 h-[30vh] gap-16">
					<div className="w-1/2 h-full">
						<LineChart
							xData={allTemp.temp}
							yData={allTemp.people}
							xLabel="Temperature (°C)"
							yLabel="People"
							title="Temperature"
						/>
					</div>
					<div className="w-1/2 h-full">
						<LineChart
							xData={[1]}
							yData={[1]}
							xLabel="Humidity (%)"
							yLabel="People"
							title="Humidity"
						/>
					</div>
				</div>

				<div id="graph2" className="flex flex-row items-start justify-center w-5/6 h-[30vh] gap-16 mt-10 ">
					<div className="w-1/2 h-full">
						<LineChart
							xData={['25', '31', '32', '33', '40']}
							yData={[12, 19, 3, 5, 8]}
							xLabel="Temperature (°C)"
							yLabel="People"
							title="Precip_mm"
						/>
					</div>
					<div className="w-1/2 h-full">
						<LineChart
							xData={['25', '31', '32', '33', '40']}
							yData={[12, 19, 3, 5, 8]}
							xLabel="Temperature (°C)"
							yLabel="People"
							title="PM 2.5"
						/>
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
					className="flex flex-row items-center justify-center w-5/6 h-[50vh] gap-16 mt-20 border">
					<LineChart
						xData={['25', '31', '32', '33', '40']}
						yData={[12, 19, 3, 5, 8]}
						xLabel="Temperature (°C)"
						yLabel="People"
						title="PM 2.5"
					/>
				</div>

				<span className={`inline-block text-left text-4xl ${WinkySans_font.className} mt-20 w-5/6`}> Bar Chart comparing amount of people throughout the day</span>
				<div id="graph2" className="flex flex-row items-start justify-center w-5/6 h-[30vh] gap-16  mt-15">
					<div className="flex flex-col items-center w-1/2 h-full">
						<BarChart
							xData={['Dawn', 'Morning', 'Noon', 'Afternoon', 'Late Afternoon']}
							yData={[12, 19, 3, 5, 8]}
							xLabel="Time"
							yLabel="People"
							title="Average people"
						/>
					</div>
					<div className="flex flex-col items-center w-1/2 h-full">
						<BarChart
							xData={['Dawn', 'Morning', 'Noon', 'Afternoon', 'Late Afternoon']}
							yData={[12, 19, 3, 5, 8]}
							xLabel="Time"
							yLabel="People"
							title="Max people"
						/>
					</div>
				</div>


			</div>
		</div>
	)
}