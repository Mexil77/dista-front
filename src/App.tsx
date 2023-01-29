import "./App.scss";
import { StoreProvider } from "easy-peasy";
import store from "./store";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

function App() {
	return (
		<StoreProvider store={store}>
			<RouterProvider router={router} />
		</StoreProvider>
	);
}

export default App;
