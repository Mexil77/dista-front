import ProductDashboard from "../Components/ProductDashboard";
import AuthRoute from "../common/AuthRoute";

export const productRoute = {
	path: "/product",
	element: <AuthRoute component={ProductDashboard} />,
};
