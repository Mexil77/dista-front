import { useStoreState } from "../hooks";

import "../Styles/Home.scss";

const Home: React.FC = () => {
	//State
	const user = useStoreState((state) => state.auth.user);

	return (
		<div className="Home">
			<h1>Bienvenido</h1>
			<h1>{user.email}</h1>
			<h1>createdAt: {user.createdAt}</h1>
		</div>
	);
};

export default Home;
