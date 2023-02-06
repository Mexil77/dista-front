import { persist, Action, action, Thunk, thunk } from "easy-peasy";
import { isEmpty } from "lodash";
import { setAuthorizationToken, setUserHeader } from "../lib/utils";
import { Injections } from ".";
import { User } from "../models/user";
import { errorMessage } from "../lib/errors";

export interface AuthModel {
	//State
	user: User;
	authenticated: boolean;
	accessToken?: string;
	//Actions
	errorRequest: Action<AuthModel, any>;
	setUser: Action<AuthModel, any>;
	logOut: Action<AuthModel>;
	//Thunks
	logIn: Thunk<AuthModel, any, Injections>;
	signUp: Thunk<AuthModel, any, Injections>;
}

export const authModel: AuthModel = persist(
	{
		//State
		user: new User({}),
		authenticated: false,
		accessToken: undefined,
		//Actions
		errorRequest: action((state, { msg, show = true }) => {
			alert(`Error: ${msg.message}`);
		}),
		setUser: action((state, payload: any) => {
			state.user = payload.user;
			state.authenticated = !isEmpty(state.user);
			state.accessToken = payload.accessToken;
			setAuthorizationToken(payload.accessToken);
			setUserHeader(payload.user._id);
		}),
		logOut: action((state) => {
			state.user = new User({});
			state.authenticated = false;
			state.accessToken = undefined;
			setAuthorizationToken(null);
			setUserHeader(null);
		}),
		//Thunks
		logIn: thunk(async (actions, payload, { injections }) => {
			try {
				const { authApi } = injections;
				const data = await authApi.logIn(payload);
				actions.setUser(data);
			} catch (error) {
				actions.errorRequest({ msg: errorMessage(error) });
				return false;
			}
			return true;
		}),
		signUp: thunk(async (actions, payload, { injections }) => {
			try {
				const { authApi } = injections;
				const data = await authApi.signUp(payload);
				actions.setUser(data);
			} catch (error) {
				actions.errorRequest({ msg: errorMessage(error) });
				return false;
			}
			return true;
		}),
	},
	{
		storage: "localStorage",
	}
);
