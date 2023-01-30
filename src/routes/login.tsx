import LogIn from "../Components/LogIn";
import NoAuthRoute from "../common/NoAuthRoute";

export const logInRoute = {
	path: "login",
	element: <NoAuthRoute component={LogIn} />,
};
