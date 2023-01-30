import { useState } from "react";
import { useStoreActions } from "../hooks";
import { useNavigate } from "react-router-dom";

import "../Styles/LogIn.scss";

export default function LogIn() {
	//Thunks
	const logIn = useStoreActions((action) => action.auth.logIn);

	//LocalState
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	//Navigation
	const navigate = useNavigate();

	//Functions
	const tryLogIn = async () => {
		const loged = await logIn({ email, password });
		if (loged) navigate("/home");
	};

	return (
		<div className="aux">
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
				<button onClick={tryLogIn}>Login</button>
			</div>
		</div>
	);
}
