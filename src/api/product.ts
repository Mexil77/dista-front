import { api } from ".";

const productApi = {
	async getProducts(payload: any) {
		const { data } = await api.get("product", { params: payload });
		return data;
	},
};

export default productApi;
