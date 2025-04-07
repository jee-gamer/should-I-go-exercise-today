import {Chart} from 'chart.js/auto';

export default function createChart(ctx, X, Y, xLabel, yLabel) {
	// X = []
	// Y = []
	return new Chart(ctx, {
		type: 'line',
		data: {
			labels: X,
			datasets: [
				{
					data: Y, // Y-axis = people
					borderColor: 'rgb(75, 192, 192)',
					backgroundColor: 'rgba(75, 192, 192, 0.2)',
					borderWidth: 2,
					fill: false,
					tension: 0.3,
				},
			],
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				legend: {
					display: false,
				},
			},
			scales: {
				y: {
					min: 0,
					max: 40,
					ticks: {
						stepSize: 5, // optional: control tick spacing
						beginAtZero: true,
					},
					title: {
						display: true,
						text: yLabel,
					},
				},
				x: {
					title: {
						display: true,
						text: xLabel, // ⬅ X-axis label
					},
				},
			},
		},
	});
}