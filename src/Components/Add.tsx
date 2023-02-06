import { useState } from "react";
import { useStoreActions } from "../hooks";
import { useNavigate } from "react-router-dom";

export default function Add() {
	//Actions
	const saveForm = useStoreActions((action) => action.form.saveForm);

	//Local State
	const [storeSelect, setStoreSelect] = useState("new");
	const [productSelect, setProductSelect] = useState(false);
	const [storeName, setStoreName] = useState("");
	const [productName, setProductName] = useState("");
	const [productValue, setProductValue] = useState(0);

	//Navigate
	const navigate = useNavigate();

	//Functions
	const handleDesitionProduct = (e: any) => {
		setProductSelect(e.target.value === "yes");
	};
	const prepareDataForm = () => {
		return {
			storeName: storeSelect === "new" ? storeName : storeSelect,
			productName: productSelect ? productName : null,
			productValue: productSelect ? productValue : null,
		};
	};
	const submitForm = async () => {
		const dataForm = prepareDataForm();
		console.log(dataForm);
		const res = await saveForm(dataForm);
		if (res) {
			setStoreSelect("");
			setProductSelect(false);
			setStoreName("");
			setProductName("");
			setProductValue(0);
			navigate("/product");
		}
	};

	return (
		<div className="Add">
			<select
				name="stores"
				id="stores"
				value={storeSelect}
				onChange={(e) => setStoreSelect(e.target.value)}
			>
				<option value="mercadona">mercadona</option>
				<option value="new">new</option>
			</select>
			<br />
			{storeSelect === "new" && (
				<input
					type="text"
					placeholder="Name of store"
					value={storeName}
					onChange={(e) => setStoreName(e.target.value)}
				/>
			)}
			<h2>Agregar un Producto a este negocio?</h2>
			<input
				type="radio"
				name="productAdd"
				value="no"
				checked={!productSelect}
				onChange={handleDesitionProduct}
			/>
			No
			<input
				type="radio"
				name="productAdd"
				value="yes"
				checked={productSelect}
				onChange={handleDesitionProduct}
			/>
			Yes
			<br />
			{productSelect && (
				<div className="Add_ProductItems">
					<input
						type="text"
						placeholder="Name of product"
						value={productName}
						onChange={(e) => setProductName(e.target.value)}
					/>
					<input
						type="number"
						placeholder="Price"
						value={productValue}
						onChange={(e) => setProductValue(parseFloat(e.target.value))}
					/>
					<button>+</button>
					<br />
				</div>
			)}
			<button onClick={submitForm}>Add</button>
		</div>
	);
}
