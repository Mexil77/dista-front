import { Link, useNavigate } from "react-router-dom";
import { useStoreState, useStoreActions } from "../hooks";

import "../Styles/Navbar.scss";

export default function Navbar() {
	//Store
	const authenticated = useStoreState((store) => store.auth.authenticated);
	//Actions
	const logOut = useStoreActions((actions) => actions.auth.logOut);

	//Navigation
	const navigate = useNavigate();

	//Functions
	const logout = () => {
		logOut();
		navigate("/");
	};
	return (
		<div className="Navbar">
			<Link to="/" className="CleanLink Navbar_Title">
				Dista
			</Link>
			{authenticated && (
				<div className="Navbar_NavLinks">
					<Link to="/list" className="CleanLink Navbar_Title">
						Lists
					</Link>
					<Link to="/product" className="CleanLink Navbar_Title">
						Products
					</Link>
					<Link to="/cart" className="CleanLink Navbar_Title">
						Cart
					</Link>
				</div>
			)}
			{authenticated ? (
				<div className="Navbar_LogButtons">
					<button onClick={logout} className="ButtonLink">
						LogOut
					</button>
				</div>
			) : (
				<div className="Navbar_LogButtons">
					<Link to="/login" className="CleanLink ButtonLink">
						Login
					</Link>
					<Link to="/signup" className="CleanLink ButtonLink">
						SignUp
					</Link>
				</div>
			)}
		</div>
	);
}
