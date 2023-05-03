import { StoreProvider } from "easy-peasy";
import store from "./store";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

import "./App.scss";
import "./Styles/defaults/Link.scss";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";

function App() {
	return (
		<StoreProvider store={store}>
			<RouterProvider router={router} />
		</StoreProvider>
	);
}

export default App;
