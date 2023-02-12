import { Action, action, Thunk, thunk } from "easy-peasy";
import { Injections } from ".";
import { errorMessage } from "../lib/errors";
import { PaginateResult } from "../interface/PaginateResult";
import { List } from "../models/list";

export interface ListModel {
	//State
	listLists: PaginateResult<List>;
	//Actions
	errorRequest: Action<ListModel, any>;
	setLists: Action<ListModel, any>;
	//Thunks
	getLists: Thunk<ListModel, any, Injections>;
}

export const listModel: ListModel = {
	//State
	listLists: {
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
	setLists: action((state, payload) => {
		state.listLists = payload;
	}),
	//Thunks
	getLists: thunk(async (actions, payload, { injections }) => {
		try {
			const { listApi } = injections;
			const data = await listApi.getLists(payload);
			actions.setLists(data);
		} catch (error) {
			actions.errorRequest({ msg: errorMessage(error) });
			return false;
		}
		return true;
	}),
};
