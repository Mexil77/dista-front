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
import { generateRandomColor } from "../lib/utils";

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
	}, [getStoresTotalsCharts]);
	const data = () => {
		return {
			labels,
			datasets: storesTotalsChart.map((store: any) => ({
				label: store.name,
				data: store.data,
				backgroundColor: generateRandomColor(),
			})),
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
