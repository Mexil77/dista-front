import { useEffect } from "react";
import { useStoreState, useStoreActions } from "../hooks";

import "../Styles/ListDashboard.scss";

import ModalAddList from "./ModalAddList";
import GridList from "./GridList";

export default function ListDashboard() {
	//Store
	const listLists = useStoreState((state) => state.list.listLists);
	//Actions
	const getLists = useStoreActions((action) => action.list.getLists);

	useEffect(() => {
		getLists({});
	}, [getLists]);

	return (
		<div className="ListDashboard">
			<ModalAddList />
			<GridList data={listLists.docs} />
		</div>
	);
}
