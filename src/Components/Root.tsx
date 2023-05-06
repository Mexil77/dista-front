import { useEffect } from "react";
import { useStoreState } from "../hooks";
import { Outlet } from "react-router-dom";
import { setAuthorizationToken } from "../lib/utils";
import Navbar from "./Navbar";
import Footer from "./Footer";

import "../Styles/Root.scss";

export default function Root() {
	const accessToken = useStoreState((state) => state.auth.accessToken);
	const authenticated = useStoreState((state) => state.auth.authenticated);
	useEffect(() => {
		if (authenticated) {
			setAuthorizationToken(accessToken);
		}
	});
	return (
		<div className="Root">
			<Navbar />
			<Outlet />
			<Footer />
		</div>
	);
}
