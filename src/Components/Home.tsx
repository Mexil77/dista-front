import { useStoreState } from "../hooks";
import { Link } from "react-router-dom";

type Props = {};

const Home: React.FC = (props: Props) => {
	const authenticated = useStoreState((state) => state.auth.authenticated);
	const accessToken = useStoreState((state) => state.auth.accessToken);
	return (
		<div>
			<h1>Authenticated: {authenticated ? "Yes" : "No"}</h1>
			<h1>accessToken: {accessToken}</h1>
			<Link to="/">Home</Link>
		</div>
	);
};

export default Home;
