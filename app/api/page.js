import '@/app/globals.css'

import { CaveatBrush_font, PM_font, WinkySans_font } from "@/app/Fonts";

export default function Api() {
    return (
      <div className="flex flex-col items-center justify-items-center min-h-fit sm:p-20 font-[family-name:var(--font-geist-sans)] notebook">
        <div id="main" className="flex flex-col items-center justify-center min-w-full">
            <span className={`text-9xl ${CaveatBrush_font.className} mt-10 text-outline`}> APIs </span>
            <span className={`inline-block text-left text-4xl ${WinkySans_font.className} mt-20 w-5/6`}> Base URL: http://localhost:3000/api </span>
            <div id="apiBoxes" className="flex flex-col items-start justify-center w-5/6 gap-16 mt-20">
                <div className="flex flex-row justify-center w-full pl-10 pr-10">
                    <span className={`text-4xl w-1/3 ${PM_font.className}`}>API</span>
                    <span className={`text-4xl w-1/3 ${PM_font.className}`} >Path</span>
                    <span className={`text-4xl w-1/3 ${PM_font.className}`}>Description</span>
                </div>
                <div className="api-box">
                    <span className="text-3xl w-1/3 align-text-top">Average people</span>
                    <span className="text-3xl w-1/3 align-text-top" >/average-people</span>
                    <span className="text-3xl w-1/3">Description here here here here here here here here here here here here here here here here here here here here here here here</span>
                </div>
                <div className="api-box">
                    <span className="text-3xl w-1/3 align-text-top">Average people</span>
                    <span className="text-3xl w-1/3 align-text-top" >/average-people</span>
                    <span className="text-3xl w-1/3">Description here here here here here here here here here here here here here here here here here here here here here here here</span>
                </div>
            </div>
        </div>
      </div>
    )
}