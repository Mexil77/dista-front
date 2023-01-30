import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStoreState } from "../hooks";

type Props = { component: any };

export default function AuthRoute({ component: Component }: Props) {
	const authenticated = useStoreState((store) => store.auth.authenticated);

	const navigate = useNavigate();

	useEffect(() => {
		if (!authenticated) {
			navigate("/");
		}
	});
	return <Component />;
}
