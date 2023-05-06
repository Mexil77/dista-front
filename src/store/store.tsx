import { Action, action, Thunk, thunk } from "easy-peasy";
import { Injections } from ".";
import { errorMessage } from "../lib/errors";
import { PaginateResult } from "../interface/PaginateResult";
import { Store } from "../models/store";

export interface StorModel {
	//State
	listStores: PaginateResult<Store>;
	//Actions
	errorRequest: Action<StorModel, any>;
	setStores: Action<StorModel, PaginateResult<Store>>;
	//Thunks
	getStores: Thunk<StorModel, any, Injections>;
}

export const storModel: StorModel = {
	//Store
	listStores: {
		docs: [],
		total: 0,
		limit: 100,
		page: 1,
		pages: 0,
	},
	//Actions
	errorRequest: action((state, { msg, show = true }) => {
		alert(`Error: ${msg.message}`);
	}),
	setStores: action((state, payload) => {
		state.listStores = payload;
	}),
	//Thunks
	getStores: thunk(async (actions, payload, { injections }) => {
		try {
			const { storeApi } = injections;
			const data = await storeApi.getStores(payload);
			actions.setStores(data);
		} catch (error) {
			actions.errorRequest({ msg: errorMessage(error) });
		}
	}),
};
