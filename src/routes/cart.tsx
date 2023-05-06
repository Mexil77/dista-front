import Cart from "../Components/Cart";
import AuthRoute from "../common/AuthRoute";

export const cartRoute = {
	path: "/cart",
	element: <AuthRoute component={Cart} />,
};
