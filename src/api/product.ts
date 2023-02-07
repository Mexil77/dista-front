import { api } from ".";

const productApi = {
	async getProducts(payload: any) {
		const { data } = await api.get("product", payload);
		return data;
	},
};

export default productApi;
