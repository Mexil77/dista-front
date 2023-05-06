import { persist } from "easy-peasy";
import { AuthModel, authModel } from "./auth";
import { FormModel, formModel } from "./form";
import { ProductModel, productModel } from "./product";
import { StorModel, storModel } from "./store";
import { ListModel, listModel } from "./list";
import { ChartModel, chartModel } from "./charts";

//Store Model interface
export interface StoreModel {
	auth: AuthModel;
	form: FormModel;
	product: ProductModel;
	store: StorModel;
	list: ListModel;
	chart: ChartModel;
}

//Store Model
const storeModel: StoreModel = {
	auth: authModel,
	form: formModel,
	product: productModel,
	store: storModel,
	list: persist(listModel),
	chart: chartModel,
};

export default storeModel;
