import { Action, action, Thunk, thunk } from "easy-peasy";
import { Injections } from ".";
import { errorMessage } from "../lib/errors";
import { PaginateResult } from "../interface/PaginateResult";
import { List } from "../models/list";
import { Product } from "../models/product";

export interface ListModel {
	//State
	listLists: PaginateResult<List>;
	listSelected: List;
	showModalAddList: boolean;
	productSelected: Product;
	//Actions
	errorRequest: Action<ListModel, any>;
	setLists: Action<ListModel, any>;
	setShowModalAddList: Action<ListModel, any>;
	setProductSelected: Action<ListModel, any>;
	setListSelected: Action<ListModel, any>;
	getLists: Thunk<ListModel, any, Injections>;
	saveModalAddList: Thunk<ListModel, any, Injections>;
	saveModalEditList: Thunk<ListModel, any, Injections>;
	deleteList: Thunk<ListModel, any, Injections>;
	deleteProductList: Thunk<ListModel, any, Injections>;
	deleteProductToAllLists: Thunk<ListModel, any, Injections>;
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
	listSelected: new List({}),
	showModalAddList: false,
	productSelected: new Product({}),
	//Actions
	errorRequest: action((state, { msg, show = true }) => {
		alert(`Error: ${msg.message}`);
	}),
	setLists: action((state, payload) => {
		state.listLists = payload;
	}),
	setShowModalAddList: action((state, payload) => {
		state.showModalAddList = payload;
	}),
	setProductSelected: action((state, payload) => {
		state.productSelected = new Product(payload);
	}),
	setListSelected: action((state, payload) => {
		state.listSelected = new List(payload);
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
	saveModalAddList: thunk(async (actions, payload, { injections }) => {
		try {
			const { listApi } = injections;
			await listApi.saveModalAddList(payload);
			actions.setShowModalAddList(false);
			actions.setProductSelected({});
		} catch (error) {
			actions.errorRequest({ msg: errorMessage(error) });
			return false;
		}
		return true;
	}),
	saveModalEditList: thunk(async (actions, payload, { injections }) => {
		try {
			const { listApi } = injections;
			await listApi.saveModalEditList(payload);
			actions.setShowModalAddList(false);
			actions.setListSelected({});
			actions.setProductSelected({});
		} catch (error) {
			actions.errorRequest({ msg: errorMessage(error) });
			return false;
		}
		return true;
	}),
	deleteList: thunk(async (actions, payload, { injections }) => {
		try {
			const { listApi } = injections;
			await listApi.deleteList(payload);
			actions.setShowModalAddList(false);
			actions.setListSelected({});
			actions.setProductSelected({});
		} catch (error) {
			actions.errorRequest({ msg: errorMessage(error) });
			return false;
		}
		return true;
	}),
	deleteProductList: thunk(async (actions, payload, { injections }) => {
		try {
			const { listApi } = injections;
			await listApi.deleteProductList(payload);
			actions.setShowModalAddList(false);
			actions.setListSelected({});
			actions.setProductSelected({});
		} catch (error) {
			actions.errorRequest({ msg: errorMessage(error) });
			return false;
		}
		return true;
	}),
	deleteProductToAllLists: thunk(async (actions, payload, { injections }) => {
		try {
			const { listApi } = injections;
			await listApi.deleteProductToAllLists(payload);
		} catch (error) {
			actions.errorRequest({ msg: errorMessage(error) });
			return false;
		}
	}),
};
