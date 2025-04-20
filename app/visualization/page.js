'use client';

import {useEffect, useState} from 'react';
import {BarChart, LineChart} from "@/lib/CanvasMaker";

import '@/app/globals.css'

import { CaveatBrush_font, PM_font, WinkySans_font } from "@/app/Fonts";
import axios from "axios";

export default function Visualization() {
	let [time, setTime] = useState("Dawn");
	let [weather, setWeather] = useState("Temperature");
	let [customGraph, setCustomGraph] = useState({});

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
		const fetchAllData = async () => {
			const res = await axios.get('/api/all-metrics');
			const { people, temperature, humidity, pm25, precip } = res.data;

			const process = (metric, setState) => {
				const combined = people.map((person, index) => ({
					person,
					value: metric[index]
				}));

				combined.sort((a, b) => a.value - b.value);

				const sortedPeople = combined.map(item => item.person);
				const sortedValues = combined.map(item => item.value);

				setState({
					people: sortedPeople,
					values: sortedValues
				});
			};

			process(temperature, setAllTemp);
			process(humidity, setAllHumid);
			process(pm25, setAllPm25);
			process(precip, setAllPrecip);
		};

		fetchAllData();
	}, []);


	useEffect(() => {
		let format_time = time
		let format_weather = weather
		if (format_time === "Late Afternoon") {
			format_time = "late-afternoon";
		}
		if (format_weather === "Precip_mm") {
			format_weather = "precip";
		} else if (format_weather === "PM 2.5") {
			format_weather = "pm25";
		}
		format_weather = format_weather.toLowerCase();
		const getData = async () => {
			const [weatherRes, peopleRes] = await Promise.all([
				axios.get(`/api/all-${format_weather}`, { params: {
					time: format_time } }),
				axios.get('/api/all-people', { params: {
					time: format_time } })
			]);

			const people = peopleRes.data.result;
			const metrics = weatherRes.data.result;
			console.log(people)
			console.log(metrics)

			const combined = people.map((person, index) => ({
				person,
				value: metrics[index]
			}));

			combined.sort((a, b) => a.value - b.value);

			const sortedPeople = combined.map(item => item.person);
			const sortedValues = combined.map(item => item.value);

			setCustomGraph({
				people: sortedPeople,
				values: sortedValues
			});
		}
		getData();
	}, [time, weather]);

	return (
		<div className="flex flex-col items-center justify-items-center min-h-fit h-screen sm:p-20 font-[family-name:var(--font-geist-sans)] text-black notebook-wo-line">
			<div id="main" className="flex flex-col items-center justify-items-start min-w-full min-h-screen">
				<span className={`text-9xl ${CaveatBrush_font.className} mt-10 text-outline`}> Visualization </span>
				<span className={`inline-block text-left text-4xl ${WinkySans_font.className} mt-20 w-5/6 mb-15`}> Relationship Graph between people and weather</span>

				<div id="graph1" className="flex flex-row items-start justify-center w-5/6 h-[30vh] gap-16">
					<div className="w-1/2 h-full">
						<LineChart
							xData={allTemp.values}
							yData={allTemp.people}
							xLabel="Temperature (°C)"
							yLabel="People"
							title="Temperature"
						/>
					</div>
					<div className="w-1/2 h-full">
						<LineChart
							xData={allHumid.values}
							yData={allHumid.people}
							xLabel="Humidity (%)"
							yLabel="People"
							title="Humidity"
						/>
					</div>
				</div>

				<div id="graph2" className="flex flex-row items-start justify-center w-5/6 h-[30vh] gap-16 mt-10 ">
					<div className="w-1/2 h-full">
						<LineChart
							xData={allPrecip.values}
							yData={allPrecip.people}
							xLabel="Precip (mm)"
							yLabel="People"
							title="Precip_mm"
						/>
					</div>
					<div className="w-1/2 h-full">
						<LineChart
							xData={allPm25.values}
							yData={allPm25.people}
							xLabel="PM 2.5 (µg/m³)"
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
						<select value={weather} onChange={e => setWeather(e.target.value)}>
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
						xData={customGraph.values}
						yData={customGraph.people}
						xLabel={weather}
						yLabel="People"
						title={time}
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