import { api } from ".";

const chartApi = {
	async getStoresTotalsCharts(payload: any) {
		const { data } = await api.get("chart/storesTotalsChart", {
			params: payload,
		});
		return data;
	},
};

export default chartApi;
