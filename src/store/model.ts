import { AuthModel, authModel } from "./auth";

//Store Model interface
export interface StoreModel {
	auth: AuthModel;
}

//Store Model
const storeModel: StoreModel = {
	auth: authModel,
};

export default storeModel;
