import { useEffect, useRef } from "react";
import ChartMaker from "./ChartMaker";

export const LineChart = ({ xData, yData, xLabel, yLabel, title }) => {
	const canvasRef = useRef(null);

	useEffect(() => {
		const ctx = canvasRef.current?.getContext("2d");
		if (!ctx) return;

		const chart = ChartMaker.createLineChart(ctx, xData, yData, xLabel, yLabel, title);
		return () => chart.destroy();
	}, [xData, yData, xLabel, yLabel, title]);

	return <canvas className="bg-white" ref={canvasRef} />;
};

export const BarChart = ({ xData, yData, xLabel, yLabel, title }) => {
	const canvasRef = useRef(null);

	useEffect(() => {
		const ctx = canvasRef.current?.getContext("2d");
		if (!ctx) return;

		const chart = ChartMaker.createBarChart(ctx, xData, yData, xLabel, yLabel, title);
		return () => chart.destroy();
	}, [xData, yData, xLabel, yLabel, title]);

	return <canvas className="bg-white" ref={canvasRef} />;
};
