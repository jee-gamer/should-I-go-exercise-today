'use client';

import { useEffect, useRef } from 'react';
import createChart from "@/lib/Graph";

import '@/app/globals.css'

import { CaveatBrush_font, PM_font, WinkySans_font } from "@/app/Fonts";

export default function Visualization() {
    const tempPeople = useRef(null);

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

    return (
      <div className="flex flex-col items-center justify-items-center min-h-screen sm:p-20 font-[family-name:var(--font-geist-sans)] notebook-wo-line">
        <div id="main" className="flex flex-col items-center justify-items-start min-w-full min-h-full border">
            <span className={`text-9xl ${CaveatBrush_font.className} mt-10 text-outline`}> Visualization </span>
            <span className={`inline-block text-left text-4xl ${WinkySans_font.className} mt-20 w-5/6`}> Relationship Graph </span>
            <span className={`inline-block text-left text-4xl ${WinkySans_font.className} mt-20 w-5/6`}> People and Temperature </span>
            <div id="temperature-people" className="flex flex-col items-start justify-center w-5/6 h-1/3 gap-16 mt-20 border">
                <canvas ref={tempPeople}></canvas>
            </div>
        </div>
      </div>
    )
}