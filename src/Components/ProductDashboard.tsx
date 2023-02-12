import { useEffect } from "react";
import { useStoreState, useStoreActions } from "../hooks";
import FilterBar from "./FilterBar";
import Grid from "./Grid";

import "../Styles/ProductDashboard.scss";

export default function ProductDashboard() {
	//State
	const products = useStoreState((state) => state.product.listProducts);
	//Actions
	const getProducts = useStoreActions((action) => action.product.getProducts);
	const getStores = useStoreActions((action) => action.store.getStores);

	useEffect(() => {
		getProducts({});
		getStores({});
	}, [getProducts, getStores]);
	return (
		<div className="ProductDashboard">
			<FilterBar />
			<Grid data={products.docs} />
		</div>
	);
}
