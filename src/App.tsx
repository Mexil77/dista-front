import "./App.css";
import { StoreProvider } from "easy-peasy";
import store from "./store";

import Home from "./Components/Home";

function App() {
	return (
		<StoreProvider store={store}>
			<div className="App">
				<h1>hola mundo</h1>
				<Home />
			</div>
		</StoreProvider>
	);
}

export default App;
