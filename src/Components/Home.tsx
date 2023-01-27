import { useStoreState } from "../hooks";

type Props = {};

const Home: React.FC = (props: Props) => {
	const authenticated = useStoreState((state) => state.auth.authenticated);
	return (
		<div>
			<h1>Authenticated: {authenticated ? "Yes" : "No"}</h1>
		</div>
	);
};

export default Home;
