import { api } from "../api";
import { isEmpty } from "lodash";

export const setAuthorizationToken: any = (
	token: string | undefined | null
) => {
	if (!isEmpty(token)) {
		api.defaults.headers.common.Authorization = `Dragon ${token}`;
	} else {
		delete api.defaults.headers.common.Authorization;
	}
};

export const setUserHeader: any = (userId: string) => {
	if (!isEmpty(userId)) {
		api.defaults.headers.common["User-Agent"] = userId;
	} else {
		delete api.defaults.headers.common["User-Agent"];
	}
};
