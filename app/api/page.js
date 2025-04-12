import '@/app/globals.css'

import { CaveatBrush_font, PM_font, WinkySans_font } from "@/app/Fonts";

export default function Api() {
    return (
      <div className="flex flex-col items-center justify-items-center min-h-fit sm:p-20 font-[family-name:var(--font-geist-sans)] notebook">
        <div id="main" className="flex flex-col items-center justify-center min-w-full">
            <span className={`text-9xl ${CaveatBrush_font.className} mt-10 text-outline`}> APIs </span>
            <span className={`inline-block text-left text-4xl ${WinkySans_font.className} mt-20 w-5/6`}> Base URL: http://localhost:3000/api </span>
            <span className={`inline-block text-left text-4xl ${WinkySans_font.className} mt-20 w-5/6`}> Time Inteval: [Dawn (7-9), Morning (9-11), Noon (11-13), Afternoon (13-15), Late Afternoon (15-17)] </span>

            <span className={`inline-block text-left text-4xl ${PM_font.className} mt-20 w-5/6`}> Request: </span>

            <div id="apiBoxes" className="flex flex-col items-start justify-center w-5/6 gap-16 mt-20">
                <div className="flex flex-row justify-center w-full pl-10 pr-10">
                    <span className={`text-4xl w-1/3 ${PM_font.className}`}>API</span>
                    <span className={`text-4xl w-1/3 ${PM_font.className}`} >Path</span>
                    <span className={`text-4xl w-1/3 ${PM_font.className}`}>Description</span>
                </div>

                <div className="api-box">
                    <span className="text-3xl w-1/3 align-text-top">Suggestion at [time]</span>
                    <span className="text-3xl w-1/3 align-text-top" >/suggestion</span>
                    <span className="text-3xl w-1/3">Return the suggestion whether you should go exercise at the time interval. Will return json {"{suggestion, description}"}</span>
                </div>
                <div className="api-box">
                    <span className="text-3xl w-1/3 align-text-top">People prediction at [time]</span>
                    <span className="text-3xl w-1/3 align-text-top" >/people-at</span>
                    <span className="text-3xl w-1/3">Return the amount of people that might come attend basketball court at the time interval based on weather data at the location provided.</span>
                </div>
                <div className="api-box">
                    <span className="text-3xl w-1/3 align-text-top">People prediction now</span>
                    <span className="text-3xl w-1/3 align-text-top" >/people-now</span>
                    <span className="text-3xl w-1/3">Return the amount of people that might come attend basketball court now based on weather data at the location provided.</span>
                </div>
                <div className="api-box">
                    <span className="text-3xl w-1/3 align-text-top">Average people at [time]</span>
                    <span className="text-3xl w-1/3 align-text-top" >/average-people</span>
                    <span className="text-3xl w-1/3">Return the average amount of people that attend the basketball court at KU at the time interval</span>
                </div>
                <div className="api-box">
                    <span className="text-3xl w-1/3 align-text-top">Max people at [time]</span>
                    <span className="text-3xl w-1/3 align-text-top" >/max-people</span>
                    <span className="text-3xl w-1/3">Return the max amount of people that attend the basketball court at KU at the time interval</span>
                </div>
                <div className="api-box">
                    <span className="text-3xl w-1/3 align-text-top">Min people at [time]</span>
                    <span className="text-3xl w-1/3 align-text-top" >/min-people</span>
                    <span className="text-3xl w-1/3">Return the min amount of people that attend the basketball court at KU at the time interval</span>
                </div>

            </div>

            <span className={`inline-block text-left text-4xl ${PM_font.className} mt-20 w-5/6`}> Request Parameters: </span>

            <div id="apiBoxes" className="flex flex-col items-start justify-center w-5/6 gap-16 mt-20">
                <div className="flex flex-row justify-center w-full pl-10 pr-10">
                    <span className={`text-4xl w-1/3 ${PM_font.className}`}>Parameter</span>
                    <span className={`text-4xl w-1/3 ${PM_font.className}`} ></span>
                    <span className={`text-4xl w-1/3 ${PM_font.className}`}>Description</span>
                </div>

                <div className="api-box">
                    <span className="text-3xl w-1/3 align-text-top">time</span>
                    <span className="text-3xl w-1/3 align-text-top" >required</span>
                    <span className="text-3xl w-1/3">Choose one time from the time interval listed above. Ex: Dawn</span>
                </div>
                <div className="api-box">
                    <span className="text-3xl w-1/3 align-text-top">lat</span>
                    <span className="text-3xl w-1/3 align-text-top" >optional for /suggestion</span>
                    <span className="text-3xl w-1/3">latitude of the location user wants suggestion</span>
                </div>
                <div className="api-box">
                    <span className="text-3xl w-1/3 align-text-top">lon</span>
                    <span className="text-3xl w-1/3 align-text-top" >optional for /suggestion</span>
                    <span className="text-3xl w-1/3">longitude of the location user wants suggestion</span>
                </div>
                <div className="api-box">
                    <span className="text-3xl w-1/3 align-text-top">percent</span>
                    <span className="text-3xl w-1/3 align-text-top" >optional for /people-*</span>
                    <span className="text-3xl w-1/3">Set this to true if you want to get amount of people in percentage (of max people)</span>
                </div>
            </div>
        </div>
      </div>
    )
}