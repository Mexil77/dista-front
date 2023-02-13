import { AuthModel, authModel } from "./auth";
import { FormModel, formModel } from "./form";
import { ProductModel, productModel } from "./product";
import { StorModel, storModel } from "./store";
import { ListModel, listModel } from "./list";

//Store Model interface
export interface StoreModel {
	auth: AuthModel;
	form: FormModel;
	product: ProductModel;
	store: StorModel;
	list: ListModel;
}

//Store Model
const storeModel: StoreModel = {
	auth: authModel,
	form: formModel,
	product: productModel,
	store: storModel,
	list: listModel,
};

export default storeModel;
