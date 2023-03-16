import Root from "../Components/Root";
import { landingRoute } from "./landing";
import { homeRoute } from "./home";
import { logInRoute } from "./login";
import { signUpRoute } from "./signin";
import { productRoute } from "./product";
import { addRoute } from "./add";
import { listRouth } from "./list";
import { cartRoute } from "./cart";

export const rootRoute = {
	path: "/",
	element: <Root />,
	children: [
		landingRoute,
		homeRoute,
		logInRoute,
		signUpRoute,
		productRoute,
		listRouth,
		addRoute,
		cartRoute,
	],
};
