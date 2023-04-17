import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useEffect } from "react";
import { useStoreState, useStoreActions } from "../hooks";

import "../Styles/Analytics.scss";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

export const options = {
	responsive: true,
	plugins: {
		legend: {
			position: "top" as const,
		},
		title: {
			display: true,
			text: "Spend per store",
		},
	},
};

const labels = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

export default function Analytics() {
	const storesTotalsChart = useStoreState(
		(state) => state.chart.storesTotalsChart
	);
	const getStoresTotalsCharts: any = useStoreActions(
		(action) => action.chart.getStoresTotalsCharts
	);

	useEffect(() => {
		getStoresTotalsCharts({});
	});
	const data = () => {
		return {
			labels,
			datasets: storesTotalsChart.map((store: any) => ({
				label: store.name,
				data: store.data,
				backgroundColor: "rgba(255, 99, 132, 0.5)",
			})),
			// datasets: [
			// 	{
			// 		label: "Dia",
			// 		data: labels.map((label, idx) => idx * 100),
			// 		backgroundColor: "rgba(255, 99, 132, 0.5)",
			// 	},
			// 	{
			// 		label: "Carrefour",
			// 		data: labels.map((label, idx) => 1000 - idx * 100),
			// 		backgroundColor: "rgba(53, 162, 235, 0.5)",
			// 	},
			// 	{
			// 		label: "Corte Ingles",
			// 		data: labels.map(() => 500),
			// 		backgroundColor: "rgba(153, 62, 125, 0.5)",
			// 	},
			// ],
		};
	};
	return (
		<div className="Analytics">
			<h1>Analytics</h1>
			<div className="Analytics_Charts">
				<div className="Analytics_Charts_Chart">
					<Bar options={options} data={data()} />
				</div>
			</div>
		</div>
	);
}
