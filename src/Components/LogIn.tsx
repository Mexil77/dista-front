import { useState } from "react";
import { useStoreActions } from "../hooks";
import { Link } from "react-router-dom";

import "../Styles/Login.scss";

export default function LogIn() {
	const logIn = useStoreActions((action) => action.auth.logIn);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const tryLogIn = () => {
		if (password === confirmPassword) {
			logIn({ email, password });
		}
	};

	return (
		<div className="LogIn">
			<input
				onChange={(e) => setEmail(e.target.value)}
				value={email}
				type="email"
				placeholder="Email"
				name="email"
			/>
			<input
				onChange={(e) => setPassword(e.target.value)}
				value={password}
				type="password"
				placeholder="Password"
				name="password"
			/>
			<input
				onChange={(e) => setConfirmPassword(e.target.value)}
				value={confirmPassword}
				type="password"
				placeholder="Confirm Password"
				name="confirmPassword"
			/>
			<button onClick={tryLogIn}>Login</button>
			<Link to="/home">Home</Link>
		</div>
	);
}
