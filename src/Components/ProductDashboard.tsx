import { useEffect } from "react";
import { useStoreActions, useStoreState } from "../hooks";
import { Outlet } from "react-router-dom";

import FilterBar from "./FilterBar";
// import Grid from "./Grid";
import ModalAddList from "./ModalAddList";

import "../Styles/ProductDashboard.scss";

export default function ProductDashboard() {
	//State
	const listProducts = useStoreState((store) => store.product.listProducts);
	//Actions
	const getProducts = useStoreActions((action) => action.product.getProducts);
	const getStores = useStoreActions((action) => action.store.getStores);
	const getLists = useStoreActions((action) => action.list.getLists);

	useEffect(() => {
		getProducts({});
		getStores({});
		getLists({});
	}, [getProducts, getStores, getLists, listProducts]);
	return (
		<div className="ProductDashboard">
			<ModalAddList />
			<FilterBar />
			{/* <Grid /> */}
			<Outlet />
		</div>
	);
}
