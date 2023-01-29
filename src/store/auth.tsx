import { persist, Action, action, Thunk, thunk } from "easy-peasy";
import { isEmpty } from "lodash";
import { setAuthorizationToken } from "../lib/utils";
import { Injections } from ".";

export interface AuthModel {
	//State
	authenticated: boolean;
	accessToken?: string;
	email?: string;
	//Action
	setUser: Action<AuthModel, any>;
	//Thunk
	logIn: Thunk<AuthModel, any, Injections>;
}

export const authModel: AuthModel = persist(
	{
		//State
		authenticated: false,
		accessToken: undefined,
		email: undefined,
		//Action
		setUser: action((state, paylaod: any) => {
			state.email = paylaod.user.email;
			state.authenticated = !isEmpty(state.email);
			state.accessToken = paylaod.accessToken;
			setAuthorizationToken(paylaod.accessToken);
		}),
		//Thunk
		logIn: thunk(async (actions, payload, { injections }) => {
			try {
				const { authApi } = injections;
				const data = await authApi.logIn(payload);

				actions.setUser(data);
			} catch (error) {
				console.log(error);
			}
		}),
	},
	{
		storage: "localStorage",
	}
);
