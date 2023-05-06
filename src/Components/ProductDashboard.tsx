import { useEffect } from "react";
import { useStoreActions } from "../hooks";
import { Outlet } from "react-router-dom";

import FilterBar from "./FilterBar";
// import Grid from "./Grid";
import ModalAddList from "./ModalAddList";

import "../Styles/ProductDashboard.scss";

export default function ProductDashboard() {
	//Actions
	const getProducts = useStoreActions((action) => action.product.getProducts);
	const getStores = useStoreActions((action) => action.store.getStores);
	const getLists = useStoreActions((action) => action.list.getLists);

	useEffect(() => {
		getProducts({});
		getStores({});
		getLists({});
	}, [getProducts, getStores, getLists]);
	return (
		<div className="ProductDashboard">
			<ModalAddList />
			<FilterBar />
			{/* <Grid /> */}
			<Outlet />
		</div>
	);
}
