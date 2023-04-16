import { api } from "../api";
import { isEmpty } from "lodash";
import { CartProduct } from "../models/cartProduct";
import { storeTotal } from "../models/list";
import { Store } from "../models/store";

export const setAuthorizationToken: any = (
	token: string | undefined | null
) => {
	if (!isEmpty(token)) {
		api.defaults.headers.common.Authorization = `Dragon ${token}`;
	} else {
		delete api.defaults.headers.common.Authorization;
	}
};

export const formatPrice = (price: number): number =>
	parseFloat(price.toFixed(2));

export const totalListProducts = (listProducts: CartProduct[]): number => {
	return listProducts.reduce(
		(acc, product) => formatPrice((acc += product.price)),
		0
	);
};

export const makeStoreTotals = (listProducts: CartProduct[]): storeTotal[] => {
	let listStores = listProducts.reduce((acc, product, idx, listP) => {
		let val = product.store._id;
		if (listP.findIndex((product) => product.store._id === val) === idx)
			acc.push(product.store);
		return acc;
	}, [] as Store[]);
	const listStoreTotals = listStores.map((store) => {
		let val = store._id;
		const total = listProducts.reduce((acc, product) => {
			if (product.store._id === val) acc += product.price;
			return formatPrice(acc);
		}, 0);
		return {
			store,
			total,
		};
	});
	return listStoreTotals;
};
