import Root from "../Components/Root";
import Landing from "../Components/Landing";
import { logInRoute } from "./login";

export const rootRoute = {
	path: "/",
	element: <Root />,
	children: [
		{
			path: "",
			element: <Landing />,
		},
		logInRoute,
	],
};
