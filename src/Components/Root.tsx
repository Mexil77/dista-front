import { Outlet } from "react-router-dom";

import "../Styles/Root.scss";

export default function Root() {
	return (
		<div className="Root">
			<h1>Nav</h1>
			<Outlet />
			<h1>Footer</h1>
		</div>
	);
}
