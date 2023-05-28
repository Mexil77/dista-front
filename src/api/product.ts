import { api } from ".";

const productApi = {
	async getProducts(payload: any) {
		const { data } = await api.get("product", { params: payload });
		return data;
	},

	async deleteProduct(payload: any) {
		const { data } = await api.delete(`product/${payload._id}`);
		return data;
	},
};

export default productApi;
