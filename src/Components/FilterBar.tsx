import { Link } from "react-router-dom";
import { useState } from "react";
import { useStoreState, useStoreActions } from "../hooks";

export default function FilterBar() {
	//State
	const listStores = useStoreState((state) => state.store.listStores);

	//Actions
	const getProducts = useStoreActions((action) => action.product.getProducts);

	//Local State
	const [queryState, setQueryState] = useState({
		queryStoreSelect: "",
	});

	//Functions
	const prepareDataForm = (data: any) => {
		return { store: data.queryStoreSelect };
	};
	const onFiledChange = (e: any) => {
		let value = e.target.value;

		setQueryState({ ...queryState, [e.target.id]: value });
		getProducts(prepareDataForm({ ...queryState, [e.target.id]: value }));
	};

	return (
		<div className="FilterBar">
			<h3>Product</h3>
			<input type="text" />
			<Link to="/add">Add</Link>
			<select
				name="queryStoreSelect"
				id="queryStoreSelect"
				value={queryState.queryStoreSelect}
				onChange={onFiledChange}
			>
				<option value="">-</option>
				{listStores.docs.map((store) => (
					<option key={store?._id} value={store?._id}>
						{store?.name}
					</option>
				))}
			</select>
			<button>List</button>
			<button>Square</button>
		</div>
	);
}
