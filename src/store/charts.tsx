import { Action, Thunk, action, thunk } from "easy-peasy";
import { errorMessage } from "../lib/errors";
import { Injections } from ".";

export interface ChartModel {
	//State
	storesTotalsChart: any;
	//Actions
	errorRequest: Action<ChartModel, any>;
	setStoresTotalsCharts: Action<ChartModel, any>;
	//Thunks
	getStoresTotalsCharts: Thunk<ChartModel, any, Injections>;
}

export const chartModel: ChartModel = {
	//State
	storesTotalsChart: [],
	//Actions
	errorRequest: action((state, { msg, show = true }) => {
		alert(`Error: ${msg.message}`);
	}),
	setStoresTotalsCharts: action((state, payload) => {
		state.storesTotalsChart = payload;
	}),
	//Thunks
	getStoresTotalsCharts: thunk(async (actions, payload, { injections }) => {
		try {
			const { chartApi } = injections;
			const data = await chartApi.getStoresTotalsCharts(payload);

			actions.setStoresTotalsCharts(data);
		} catch (error) {
			actions.errorRequest({ msg: errorMessage(error) });
			return false;
		}
		return true;
	}),
};
