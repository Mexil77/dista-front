import { createStore } from "easy-peasy";
import storeModel from "./model";

//Apis
import authApi from "../api/auth";

//Api Injections
export interface Injections {
	authApi: typeof authApi;
}

const store = createStore(storeModel, { injections: { authApi } });

export default store;
