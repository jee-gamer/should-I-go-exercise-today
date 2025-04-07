import '@/app/globals.css'

import { CaveatBrush_font, PM_font, WinkySans_font } from "@/app/Fonts";

export default function Api() {
    return (
      <div className="flex flex-col items-center justify-items-center min-h-screen sm:p-20 font-[family-name:var(--font-geist-sans)] notebook">
        <div id="main" className="flex flex-col items-center justify-center min-w-full border">
            <span className={`text-9xl ${CaveatBrush_font.className} mt-10`}> APIs </span>
            <span className={`inline-block text-left text-4xl ${WinkySans_font.className} mt-20 w-5/6`}> Base URL: http://localhost:3000/api </span>
            <div id="apiBoxes" className="flex flex-col items-start justify-center w-5/6 gap-16 mt-20 border">
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