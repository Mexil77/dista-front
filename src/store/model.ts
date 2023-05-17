import { persist } from "easy-peasy";
import { AuthModel, authModel } from "./auth";
import { FormModel, formModel } from "./form";
import { ProductModel, productModel } from "./product";
import { StorModel, storModel } from "./store";
import { ListModel, listModel } from "./list";
import { ChartModel, chartModel } from "./charts";
import { TicketModel, ticketModel } from "./ticket";

//Store Model interface
export interface StoreModel {
	auth: AuthModel;
	form: FormModel;
	product: ProductModel;
	store: StorModel;
	list: ListModel;
	ticket: TicketModel;
	chart: ChartModel;
}

//Store Model
const storeModel: StoreModel = {
	auth: authModel,
	form: formModel,
	product: productModel,
	store: storModel,
	list: listModel,
	ticket: persist(ticketModel),
	chart: chartModel,
};

export default storeModel;
