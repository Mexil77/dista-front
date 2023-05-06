import ListDashboard from "../Components/ListDashboard";
import AuthRoute from "../common/AuthRoute";

export const listRouth = {
	path: "/list",
	element: <AuthRoute component={ListDashboard} />,
};
