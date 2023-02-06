import { createStore } from "easy-peasy";
import storeModel from "./model";

//Apis
import authApi from "../api/auth";
import formApi from "../api/form";

//Api Injections
export interface Injections {
	authApi: typeof authApi;
	formApi: typeof formApi;
}

const store = createStore(storeModel, { injections: { authApi, formApi } });

export default store;
