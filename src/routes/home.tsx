import Home from "../Components/Home";
import AuthRoute from "../common/AuthRoute";

export const homeRoute = {
	path: "/home",
	element: <AuthRoute component={Home} />,
};
