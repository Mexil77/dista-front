import ProductDashboard from "../Components/ProductDashboard";
import AuthRoute from "../common/AuthRoute";
import Grid from "../Components/Grid";
import Detail from "../Components/Detail";

export const productRoute = {
	path: "/product",
	element: <AuthRoute component={ProductDashboard} />,
	children: [
		{ path: "", element: <AuthRoute component={Grid} /> },
		{ path: "detail", element: <AuthRoute component={Detail} /> },
	],
};
