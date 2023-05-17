import { api } from "../api";
import { isEmpty } from "lodash";
import { storeTotal } from "../models/store";
import { Store } from "../models/store";
import { TicketProduct } from "../models/product";

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

export const totalTicketProducts = (
	ticketProducts: TicketProduct[]
): number => {
	return ticketProducts.reduce(
		(acc, ticketProduct) => formatPrice((acc += ticketProduct.product.price)),
		0
	);
};

export const makeTicketStoreTotals = (
	ticketProducts: TicketProduct[]
): storeTotal[] => {
	let listStores = ticketProducts.reduce((acc, ticketProduct, idx, listP) => {
		let val = ticketProduct.product.store._id;
		if (
			listP.findIndex(
				(ticketProduct) => ticketProduct.product.store._id === val
			) === idx
		)
			acc.push(ticketProduct.product.store);
		return acc;
	}, [] as Store[]);
	const listStoreTotals = listStores.map((store) => {
		let val = store._id;
		const total = ticketProducts.reduce((acc, ticketProduct) => {
			if (ticketProduct.product.store._id === val)
				acc += ticketProduct.product.price;
			return formatPrice(acc);
		}, 0);
		return {
			store,
			total,
		};
	});
	return listStoreTotals;
};

export const generateRandomColor = (): string => {
	let R = Math.floor(Math.random() * 255);
	let G = Math.floor(Math.random() * 255);
	let B = Math.floor(Math.random() * 255);
	return `rgba(${R},${G},${B},0.5)`;
};
