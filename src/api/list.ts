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
};

export default listApi;
