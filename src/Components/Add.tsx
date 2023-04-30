import { useState } from "react";
import { useStoreActions } from "../hooks";
import { useNavigate, Link } from "react-router-dom";
import { TypeProductEnumAsArray } from "../enums/type-product.enum";
import StoreDropDown from "./StoreDropDown";

export default function Add() {
	//Actions
	const saveForm = useStoreActions((action) => action.form.saveForm);

	//Local State
	const [formState, setFormState] = useState({
		storeSelect: "new",
		productSelect: false,
		storeName: "",
		products: [
			{
				productName: "",
				productValue: 0,
				productUnits: 0,
				productTypeUnit: TypeProductEnumAsArray[0],
				productDescription: "",
			},
		],
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
			products: formState.products.map((product) => ({
				productName: formState.productSelect ? product.productName : null,
				productValue: formState.productSelect ? product.productValue : null,
				productUnits: product.productUnits,
				productTypeUnit: product.productTypeUnit,
				productDescription: product.productDescription,
			})),
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
				products: [
					{
						productName: "",
						productValue: 0,
						productUnits: 0,
						productTypeUnit: TypeProductEnumAsArray[0],
						productDescription: "",
					},
				],
			});
			navigate("/product");
		}
	};
	const onFiledChange = (e: any) => {
		let value = e.target.value;
		if (e.target.id === "productSelect") value = e.target.value === "yes";
		setFormState({ ...formState, [e.target.id]: value });
	};
	const onSlotChange = (e: any, slot: { idx: number; var: string }) => {
		let value: string | number = e.target.value;
		if (!Number.isNaN(parseFloat(e.target.value)))
			value = parseFloat(e.target.value);
		let products: any[] = formState.products;
		products[slot.idx][slot.var] = value;
		setFormState({ ...formState, products });
	};
	const addSlotProduct = () => {
		setFormState({
			...formState,
			products: [
				...formState.products,
				{
					productName: "",
					productValue: 0,
					productUnits: 0,
					productTypeUnit: TypeProductEnumAsArray[0],
					productDescription: "",
				},
			],
		});
	};
	const removeSlotproduct = (idx: number) => {
		setFormState({
			...formState,
			products: formState.products.filter((product, index) => index !== idx),
		});
	};
	return (
		<div className="Add">
			<Link to="/product">
				<h1>Atras</h1>
			</Link>
			<br />
			<StoreDropDown
				defaultField={{ value: "new", text: "new" }}
				storeSelected={formState.storeSelect}
				onFiledChange={onFiledChange}
			/>
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
			{formState.productSelect &&
				formState.products.map((slot, idx) => (
					<div key={idx} className="Add_ProductItems">
						<input
							id="productName"
							type="text"
							placeholder="Name of product"
							value={slot.productName}
							onChange={(e) => onSlotChange(e, { idx, var: "productName" })}
						/>
						<input
							id="productValue"
							type="number"
							value={slot.productValue}
							onChange={(e) => onSlotChange(e, { idx, var: "productValue" })}
						/>
						<input
							id="productUnits"
							type="number"
							value={slot.productUnits}
							onChange={(e) => onSlotChange(e, { idx, var: "productUnits" })}
						/>
						<select
							name="productTypeUnit"
							id="productTypeUnit"
							value={slot.productTypeUnit}
							onChange={(e) => onSlotChange(e, { idx, var: "productTypeUnit" })}
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
							value={slot.productDescription}
							onChange={(e) =>
								onSlotChange(e, { idx, var: "productDescription" })
							}
						/>
						<button onClick={addSlotProduct}>+</button>
						<button onClick={() => removeSlotproduct(idx)}>-</button>
						<br />
					</div>
				))}
			<button onClick={submitForm}>Add</button>
		</div>
	);
}
