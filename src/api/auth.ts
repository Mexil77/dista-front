import { api } from "./";

const authApi = {
	async verifyEmail(payload: any) {
		const { data } = await api.post("auth/verify-email", null, {
			headers: { Autorization: `Dragon ${payload}` },
		});
		return data;
	},

	async signUp(payload: any) {
		const { data } = await api.post("auth/signup", payload);
		return data;
	},

	async logIn(payload: any) {
		const { data } = await api.post("auth/signin", payload);
		return data;
	},
};

export default authApi;
