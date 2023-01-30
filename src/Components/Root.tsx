import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

import "../Styles/Root.scss";

export default function Root() {
	return (
		<div className="Root">
			<Navbar />
			<Outlet />
			<Footer />
		</div>
	);
}
