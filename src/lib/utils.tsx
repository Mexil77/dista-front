import { api } from "../api";
import { isEmpty } from "lodash";

export const setAuthorizationToken = (token: string | undefined | null) => {
	if (!isEmpty(token)) {
		api.defaults.headers.common.Authorization = `Dragon ${token}`;
	} else {
		delete api.defaults.headers.common.Authorization;
	}
};
