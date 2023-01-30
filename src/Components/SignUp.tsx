import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStoreActions } from "../hooks";

import "../Styles/SignUp.scss";

export default function SignUp() {
	//Thunks
	const signUp = useStoreActions((action) => action.auth.signUp);

	//LocalState
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	//Navigation
	const navigate = useNavigate();

	//Functions
	const trySignUp = async () => {
		const signed = await signUp({ email, password, confirmPassword });
		if (signed) navigate("/home");
	};
	return (
		<div className="aux">
			<div className="SignUp">
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
				<button onClick={trySignUp}>SignUp</button>
			</div>
		</div>
	);
}
