import {Chart} from 'chart.js/auto';
// CHART SETTINGS HERE

export default class ChartMaker {

	static createLineChart(ctx, X, Y, xLabel, yLabel, title) {
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
					title: {
						display: true,
						text: title,
						font: {
							size: 30,
						}
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

	static createBarChart(ctx, X, Y, xLabel, yLabel, title) {
		return new Chart(ctx, {
			type: 'bar',
			data: {
				labels: X,
				datasets: [
					{
						data: Y,
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
				plugins: {
					legend: {
						display: false, // no label in legend since we didn't give a dataset label
					},
					title: {
						display: true,
						text: title,
						font: {
							size: 30,
						}
					},
				},
				scales: {
					x: {
						title: {
							display: true,
							text: xLabel,
						},
					},
					y: {
						title: {
							display: true,
							text: yLabel,
						},
						beginAtZero: true,
					},
				},
			},
		});
	}

}