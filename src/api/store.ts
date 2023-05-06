import { api } from ".";

const storeApi = {
	async getStores(payload: any) {
		const { data } = await api.get("store", payload);
		return data;
	},
};

export default storeApi;
