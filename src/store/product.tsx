import { Action, action, Thunk, thunk } from "easy-peasy";
import { Injections } from ".";
import { errorMessage } from "../lib/errors";
import { PaginateResult } from "../interface/PaginateResult";
import { Product } from "../models/product";

export interface ProductModel {
	//State
	productDetail: Product;
	listProducts: PaginateResult<Product>;
	//Actions
	errorRequest: Action<ProductModel, any>;
	setProductDetail: Action<ProductModel, Product>;
	setProducts: Action<ProductModel, PaginateResult<Product>>;
	//Thunks
	getProducts: Thunk<ProductModel, any, Injections>;
	deleteProduct: Thunk<ProductModel, any, Injections>;
}

export const productModel: ProductModel = {
	//State
	productDetail: new Product({}),
	listProducts: {
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
	setProductDetail: action((state, payload) => {
		state.productDetail = payload;
	}),
	setProducts: action((state, payload) => {
		state.listProducts = payload;
	}),
	//Thunks
	getProducts: thunk(async (actions, payload, { injections }) => {
		try {
			const { productApi } = injections;
			const data = await productApi.getProducts(payload);
			actions.setProducts(data);
		} catch (error) {
			actions.errorRequest({ msg: errorMessage(error) });
			return false;
		}
		return true;
	}),
	deleteProduct: thunk(async (actions, payload, { injections }) => {
		try {
			const { productApi } = injections;
			await productApi.deleteProduct(payload);
		} catch (error) {
			actions.errorRequest({ msg: errorMessage(error) });
			return false;
		}
	}),
};
