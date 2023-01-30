import { isArray } from "lodash";

export function errorMessage(error: any): any {
	if (error.response) {
		if (error.response.data) {
			if (error.response.data.error) {
				const messages = [];

				if (isArray(error.response.data.error.message)) {
					for (const message of error.response.data.error.message) {
						if (message.constraints) {
							const constraints = Object.keys(message.constraints);
							for (const key of constraints) {
								messages.push(message.constraints[key]);
							}
						} else if (message.children && message.children.length > 0) {
							for (const messageChild of message.children) {
								if (
									messageChild.constraints &&
									messageChild.constraints.length > 0
								) {
									const constraintsChild = Object.keys(
										messageChild.constraints
									);
									for (const key of constraintsChild) {
										messages.push(messageChild.constraints[key]);
									}
								} else if (
									messageChild.children &&
									messageChild.children.length > 0
								) {
									for (const cc of messageChild.children) {
										if (cc.constraints) {
											const constraintsChild = Object.keys(cc.constraints);
											for (const key of constraintsChild) {
												messages.push(cc.constraints[key]);
											}
										}
									}
								}
							}
						}
					}
				} else {
					if (
						error.response.data.error.message &&
						error.response.data.error.message.errmsg
					) {
						messages.push(error.response.data.error.message.errmsg);
					} else if (error.response.data.error.message) {
						messages.push(error.response.data.error.message);
					} else messages.push(error.response.data.error);
				}

				return {
					message: messages.join(","),
					code: error.response.data.error.code,
				};
			}
		}

		if (error.response.statusText) {
			return {
				message: error.response.statusText,
				code: error.response.status,
			};
		}

		return JSON.stringify(error.response);
	}

	return {
		message: "Error inesperado intente de nuevo ",
		code: null,
	};
}
