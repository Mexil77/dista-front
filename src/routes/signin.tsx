import SignUp from "../Components/SignUp";
import NoAuthRoute from "../common/NoAuthRoute";

export const signUpRoute = {
	path: "signup",
	element: <NoAuthRoute component={SignUp} />,
};
