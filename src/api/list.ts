import { api } from ".";

const listApi = {
	async getLists(payload: any) {
		const { data } = await api.get("list", { params: payload });
		return data;
	},

	async saveBuy(payload: any) {
		const { data } = await api.post("list/buy", payload);
		return data;
	},

	async saveModalAddList(payload: any) {
		const { data } = await api.post("list", payload);
		return data;
	},

	async saveModalEditList(payload: any) {
		const { data } = await api.post("list/edit-list", payload);
		return data;
	},

	async deleteList(payload: any) {
		const { data } = await api.delete(`list/${payload._id}`, payload);
		return data;
	},

	async deleteProductList(payload: any) {
		const { data } = await api.delete(
			`list/${payload.listId}/${payload.productId}`,
			payload
		);
		return data;
	},

	async deleteProductToAllLists(payload: any) {
		const { data } = await api.put(`list`, { productId: payload._id });
		return data;
	},

	async updateTotalsList(payload: any) {
		const { data } = await api.post("list/totals", payload);
		return data;
	},
};

export default listApi;
