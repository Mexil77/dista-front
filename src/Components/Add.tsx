import { useState } from "react";
import { useStoreState, useStoreActions } from "../hooks";
import { useNavigate, Link } from "react-router-dom";
import { TypeProductEnumAsArray } from "../enums/type-product.enum";

export default function Add() {
	//State
	const listStores = useStoreState((state) => state.store.listStores);
	//Actions
	const saveForm = useStoreActions((action) => action.form.saveForm);

	//Local State
	const [formState, setFormState] = useState({
		storeSelect: "new",
		productSelect: false,
		storeName: "",
		productName: "",
		productValue: 0,
		productUnits: 0,
		productTypeUnit: TypeProductEnumAsArray[0],
		productDescription: "",
	});

	//Navigate
	const navigate = useNavigate();

	//Functions
	const prepareDataForm = () => {
		return {
			storeState: formState.storeSelect === "new",
			storeName:
				formState.storeSelect === "new"
					? formState.storeName
					: formState.storeSelect,
			productSelect: formState.productSelect,
			productName: formState.productSelect ? formState.productName : null,
			productValue: formState.productSelect ? formState.productValue : null,
			productUnits: formState.productUnits,
			productTypeUnit: formState.productTypeUnit,
			productDescription: formState.productDescription,
		};
	};
	const submitForm = async () => {
		const dataForm = prepareDataForm();
		const res = await saveForm(dataForm);
		if (res) {
			setFormState({
				storeSelect: "new",
				productSelect: false,
				storeName: "",
				productName: "",
				productValue: 0,
				productUnits: 0,
				productTypeUnit: TypeProductEnumAsArray[0],
				productDescription: "",
			});
			navigate("/product");
		}
	};
	const onFiledChange = (e: any) => {
		let value = e.target.value;
		if (e.target.id === "productSelect") value = e.target.value === "yes";
		if (!Number.isNaN(parseFloat(e.target.value)))
			value = parseFloat(e.target.value);

		setFormState({ ...formState, [e.target.id]: value });
	};

	return (
		<div className="Add">
			<Link to="/product">
				<h1>Atras</h1>
			</Link>
			<br />
			<select
				name="storeSelect"
				id="storeSelect"
				value={formState.storeSelect}
				onChange={onFiledChange}
			>
				{listStores.docs.map((store) => (
					<option key={store._id} value={store.name}>
						{store.name}
					</option>
				))}
				<option value="new">new</option>
			</select>
			<br />
			{formState.storeSelect === "new" && (
				<input
					id="storeName"
					type="text"
					placeholder="Name of store"
					value={formState.storeName}
					onChange={onFiledChange}
				/>
			)}
			<h2>Agregar un Producto a este negocio?</h2>
			<input
				id="productSelect"
				type="radio"
				name="productAdd"
				value="no"
				checked={!formState.productSelect}
				onChange={onFiledChange}
			/>
			No
			<input
				id="productSelect"
				type="radio"
				name="productAdd"
				value="yes"
				checked={formState.productSelect}
				onChange={onFiledChange}
			/>
			Yes
			<br />
			{formState.productSelect && (
				<div className="Add_ProductItems">
					<input
						id="productName"
						type="text"
						placeholder="Name of product"
						value={formState.productName}
						onChange={onFiledChange}
					/>
					<input
						id="productValue"
						type="number"
						value={formState.productValue}
						onChange={onFiledChange}
					/>
					<input
						id="productUnits"
						type="number"
						value={formState.productUnits}
						onChange={onFiledChange}
					/>
					<select
						name="productTypeUnit"
						id="productTypeUnit"
						value={formState.productTypeUnit}
						onChange={onFiledChange}
					>
						{TypeProductEnumAsArray.map((type) => (
							<option key={type} value={type}>
								{type}
							</option>
						))}
					</select>
					<input
						id="productDescription"
						type="test"
						placeholder="Description"
						value={formState.productDescription}
						onChange={onFiledChange}
					/>
					<button>+</button>
					<br />
				</div>
			)}
			<button onClick={submitForm}>Add</button>
		</div>
	);
}
