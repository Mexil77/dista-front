import Analytics from "../Components/Analytics";
import AuthRoute from "../common/AuthRoute";

export const analyticRoute = {
	path: "/analytic",
	element: <AuthRoute component={Analytics} />,
};
