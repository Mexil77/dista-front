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
import { useEffect, useState } from "react";
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

const monthLabels = [
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
	//LocalState
	const [storeChartSelect, setStoreChartSelect] = useState({
		storeChartSelect: "",
	});
	//State
	const storesTotalsChart = useStoreState(
		(state) => state.chart.storesTotalsChart
	);
	const productsPerStoreTotalChart = useStoreState(
		(state) => state.chart.productsPerStoreTotalChart
	);
	//Thunks
	const getStoresTotalsCharts: any = useStoreActions(
		(action) => action.chart.getStoresTotalsCharts
	);
	const getProductsPerStoreTotalChart: any = useStoreActions(
		(action) => action.chart.getProductsPerStoreTotalChart
	);

	useEffect(() => {
		getStoresTotalsCharts({});
	}, [getStoresTotalsCharts]);

	//Functions
	const onFiledChange = (e: any) => {
		let value = e.target.value;
		setStoreChartSelect({ ...storeChartSelect, [e.target.id]: value });
		getProductsPerStoreTotalChart({ id: value });
	};

	const chartStoreName = () =>
		storeChartSelect.storeChartSelect !== ""
			? storesTotalsChart.find(
					(store: any) => store.id === storeChartSelect.storeChartSelect
			  ).name
			: "No selected";

	const options = (name: string) => ({
		responsive: true,
		plugins: {
			legend: {
				position: "top" as const,
			},
			title: {
				display: true,
				text: name,
			},
		},
	});

	const data = (labels: string[], data: any) => {
		return {
			labels,
			datasets: data.map((store: any) => ({
				label: store.name,
				data: store.data,
				backgroundColor: store.color,
			})),
		};
	};
	return (
		<div className="Analytics">
			<div className="Analytics_Header">
				<p>Analytics</p>
				<select
					name="storeChartSelect"
					id="storeChartSelect"
					value={storeChartSelect.storeChartSelect}
					onChange={onFiledChange}
				>
					<option value="">Select Store</option>
					{storesTotalsChart.map((store: any) => (
						<option key={store?.id} value={store?.id}>
							{store?.name}
						</option>
					))}
				</select>
			</div>
			<div className="Analytics_Charts">
				<div className="Analytics_Charts_Chart">
					<Bar
						options={options("Data per store")}
						data={data(monthLabels, storesTotalsChart)}
					/>
				</div>
				<div className="Analytics_Charts_Chart">
					<Bar
						options={options(chartStoreName())}
						data={data(["products"], productsPerStoreTotalChart)}
					/>
				</div>
			</div>
		</div>
	);
}
