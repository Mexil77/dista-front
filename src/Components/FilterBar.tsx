import { Link } from "react-router-dom";
import { useState } from "react";
import { useStoreActions } from "../hooks";
import StoreDropDown from "./StoreDropDown";

export default function FilterBar() {
	//Actions
	const getProducts = useStoreActions((action) => action.product.getProducts);

	//Local State
	const [queryState, setQueryState] = useState({
		storeSelect: "",
	});

	//Functions
	const prepareDataForm = (data: any) => {
		return { store: data.storeSelect };
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
			<StoreDropDown
				defaultField={{ value: "", text: "-" }}
				storeSelected={queryState.storeSelect}
				onFiledChange={onFiledChange}
			/>
			<button>List</button>
			<button>Square</button>
		</div>
	);
}
