import ProductDashboard from "../Components/ProductDashboard";
import AuthRoute from "../common/AuthRoute";
import Grid from "../Components/Grid";
import ProductDetail from "../Components/ProductDetail";

export const productRoute = {
	path: "/product",
	element: <AuthRoute component={ProductDashboard} />,
	children: [
		{ path: "", element: <AuthRoute component={Grid} /> },
		{ path: "detail", element: <AuthRoute component={ProductDetail} /> },
	],
};
