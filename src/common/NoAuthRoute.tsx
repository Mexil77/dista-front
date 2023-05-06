import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStoreState } from "../hooks";

type Props = { component: any };

export default function NoAuthRoute({ component: Component }: Props) {
	//Store
	const authenticated = useStoreState((state) => state.auth.authenticated);

	//Variables
	const navigate = useNavigate();

	useEffect(() => {
		if (authenticated) navigate("/home");
	});
	return !authenticated ? <Component /> : <></>;
}
