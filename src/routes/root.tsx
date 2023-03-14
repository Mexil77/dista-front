import Root from "../Components/Root";
import Landing from "../Components/Landing";
import { homeRoute } from "./home";
import { logInRoute } from "./login";
import { signUpRoute } from "./signin";
import { productRoute } from "./product";
import { addRoute } from "./add";
import { listRouth } from "./list";

export const rootRoute = {
	path: "/",
	element: <Root />,
	children: [
		{
			path: "",
			element: <Landing />,
		},
		homeRoute,
		logInRoute,
		signUpRoute,
		productRoute,
		listRouth,
		addRoute,
	],
};
