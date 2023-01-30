import { Link } from "react-router-dom";

import "../Styles/Landing.scss";

export default function Landing() {
	return (
		<div className="Landing">
			<h1>Landing</h1>
			<Link to="/home" className="CleanLink ButtonLink">
				Home
			</Link>
		</div>
	);
}
