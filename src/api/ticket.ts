import { api } from ".";

const ticketApi = {
	async saveBuy(payload: any) {
		const { data } = await api.post("ticket/buy", payload);
		return data;
	},
};

export default ticketApi;
