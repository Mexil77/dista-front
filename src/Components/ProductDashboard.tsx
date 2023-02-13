import { useEffect } from "react";
import { useStoreState, useStoreActions } from "../hooks";

import FilterBar from "./FilterBar";
import Grid from "./Grid";
import ModalAddList from "./ModalAddList";

import "../Styles/ProductDashboard.scss";

export default function ProductDashboard() {
	//State
	const products = useStoreState((state) => state.product.listProducts);
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
			<Grid data={products.docs} />
		</div>
	);
}
