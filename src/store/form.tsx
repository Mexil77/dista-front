import { persist, Action, action, Thunk, thunk } from "easy-peasy";
import { Injections } from ".";
import { errorMessage } from "../lib/errors";

export interface FormModel {
	//Actions
	errorRequest: Action<FormModel, any>;
	//Thunks
	saveForm: Thunk<FormModel, any, Injections>;
}

export const formModel: FormModel = persist({
	//Actions
	errorRequest: action((state, { msg, show = true }) => {
		alert(`Error: ${msg.message}`);
	}),
	//Thunks
	saveForm: thunk(async (actions, payload, { injections }) => {
		try {
			const { formApi } = injections;
			await formApi.saveForm(payload);
		} catch (error) {
			actions.errorRequest({ msg: errorMessage(error) });
			return false;
		}
		return true;
	}),
});
