import { createStore } from "easy-peasy";
import storeModel from "./model";

//Apis
import authApi from "../api/auth";
import formApi from "../api/form";
import productApi from "../api/product";
import storeApi from "../api/store";
import listApi from "../api/list";
import ticketApi from "../api/ticket";
import chartApi from "../api/chart";

//Api Injections
export interface Injections {
	authApi: typeof authApi;
	formApi: typeof formApi;
	productApi: typeof productApi;
	storeApi: typeof storeApi;
	listApi: typeof listApi;
	ticketApi: typeof ticketApi;
	chartApi: typeof chartApi;
}

const store = createStore(storeModel, {
	injections: {
		authApi,
		formApi,
		productApi,
		storeApi,
		listApi,
		ticketApi,
		chartApi,
	},
});

export default store;
