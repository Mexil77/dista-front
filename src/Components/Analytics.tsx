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
import StoreDropDown from "./StoreDropDown";

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
	const [storeSelect, setStoreSelect] = useState("");
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
		setStoreSelect(value);
		getProductsPerStoreTotalChart({ id: value });
	};

	const chartStoreName = () => {
		const storeHasTikets = storesTotalsChart.find(
			(store: any) => store.id === storeSelect
		);
		return storeHasTikets ? storeHasTikets.name : "Empti";
	};

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
				<StoreDropDown
					defaultField={{ value: "", text: "Select Store" }}
					storeSelected={storeSelect}
					onFiledChange={onFiledChange}
				/>
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
