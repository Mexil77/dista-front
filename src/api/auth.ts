import { api } from "./";

export default {
	async verifyEmail(payload: any) {
		const { data } = await api.post("auth/verify-email", null, {
			headers: { Autorization: `Dragon ${payload}` },
		});
		return data;
	},
};
