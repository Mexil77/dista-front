import { Action, action, Thunk, thunk } from "easy-peasy";
import { Injections } from ".";
import { errorMessage } from "../lib/errors";
import { List } from "../models/list";
import { Ticket } from "../models/ticket";
import { makeTicketStoreTotals, totalTicketProducts } from "../lib/utils";
import { TicketProduct } from "../models/product";

export interface TicketModel {
	//State
	ticketList: Ticket;
	//Actions
	errorRequest: Action<TicketModel, any>;
	setTicketProduct: Action<TicketModel, any>;
	setTicketList: Action<TicketModel, any>;
	dropTicketProduct: Action<TicketModel, any>;
	handleTicketListCheckers: Action<TicketModel, any>;
	//Thunks
	saveBuy: Thunk<TicketModel, any, Injections>;
}

export const ticketModel: TicketModel = {
	//State
	ticketList: new Ticket({ total: 0, products: [] }),
	//Actions
	errorRequest: action((state, { msg, show = true }) => {
		alert(`Error: ${msg.message}`);
	}),
	setTicketProduct: action((state, payload) => {
		const find = state.ticketList.products.find(
			(ticketProduct: TicketProduct) =>
				ticketProduct.product._id === payload._id
		);
		if (!find) {
			const newTicketProduct = new TicketProduct({
				product: payload,
				discarted: false,
				founded: true,
				discountRate: 0,
				quantity: 1,
			});
			state.ticketList.products.push(newTicketProduct);
			state.ticketList.total = totalTicketProducts(state.ticketList.products);
			state.ticketList.storeTotals = makeTicketStoreTotals(
				state.ticketList.products
			);
		}
	}),
	setTicketList: action((state, payload) => {
		state.ticketList = payload;
	}),
	dropTicketProduct: action((state, payload) => {
		state.ticketList.products = state.ticketList.products.filter(
			(ticketProduct: TicketProduct) => ticketProduct.product._id !== payload
		);
		state.ticketList.total = totalTicketProducts(state.ticketList.products);
		state.ticketList.storeTotals = makeTicketStoreTotals(
			state.ticketList.products
		);
	}),
	handleTicketListCheckers: action((state, payload) => {
		state.ticketList.products = state.ticketList.products.map(
			(ticketProduct: TicketProduct) =>
				ticketProduct.product._id !== payload.id
					? ticketProduct
					: { ...ticketProduct, [payload.field]: payload.value }
		);
	}),
	//Thunks
	saveBuy: thunk(async (actions, payload, { injections }) => {
		try {
			const { listApi } = injections;
			await listApi.saveBuy(payload);
			actions.setTicketList(
				new List({ name: "Ticket", total: 0, products: [] })
			);
		} catch (error) {
			actions.errorRequest({ msg: errorMessage(error) });
			return false;
		}
		return true;
	}),
};
