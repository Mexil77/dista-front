import { api } from ".";

const listApi = {
	async getLists(payload: any) {
		const { data } = await api.get("list", { params: payload });
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
};

export default listApi;
