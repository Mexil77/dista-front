import Add from "../Components/Add";
import AuthRoute from "../common/AuthRoute";

export const addRoute = {
	path: "/add",
	element: <AuthRoute component={Add} />,
};
