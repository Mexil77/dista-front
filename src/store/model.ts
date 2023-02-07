import { AuthModel, authModel } from "./auth";
import { FormModel, formModel } from "./form";
import { ProductModel, productModel } from "./product";
import { StorModel, storModel } from "./store";

//Store Model interface
export interface StoreModel {
	auth: AuthModel;
	form: FormModel;
	product: ProductModel;
	store: StorModel;
}

//Store Model
const storeModel: StoreModel = {
	auth: authModel,
	form: formModel,
	product: productModel,
	store: storModel,
};

export default storeModel;
