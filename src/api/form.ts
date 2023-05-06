import { api } from ".";

const formApi = {
	async saveForm(payload: any) {
		const { data } = await api.post("form", payload);
		return data;
	},
};

export default formApi;
