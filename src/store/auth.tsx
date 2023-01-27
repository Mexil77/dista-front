import { persist } from "easy-peasy";

export interface AuthModel {
	authenticated: boolean;
}

export const authModel: AuthModel = persist(
	{
		//state
		authenticated: false,
	},
	{
		storage: "localStorage",
	}
);
