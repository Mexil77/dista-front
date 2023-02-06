import { useStoreState } from "../hooks";
import { Link } from "react-router-dom";

import "../Styles/Home.scss";

const Home: React.FC = () => {
	//State
	const user = useStoreState((state) => state.auth.user);

	return (
		<div className="Home">
			<h1>Bienvenido</h1>
			<h1>{user.email}</h1>
			<h1>createdAt: {user.createdAt}</h1>
			<Link to="/product">product</Link>
		</div>
	);
};

export default Home;
