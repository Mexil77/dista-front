import { AuthModel, authModel } from "./auth";
import { FormModel, formModel } from "./form";

//Store Model interface
export interface StoreModel {
	auth: AuthModel;
	form: FormModel;
}

//Store Model
const storeModel: StoreModel = {
	auth: authModel,
	form: formModel,
};

export default storeModel;
