import "../Styles/Cart.scss";
import { useStoreState, useStoreActions } from "../hooks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactDatePicker from "react-datepicker";

import { AiFillDelete } from "react-icons/ai";

export default function Cart() {
	const [startDate, setStartDate] = useState<Date>(new Date());
	//State
	const cartList = useStoreState((state) => state.list.cartList);
	//Actions
	const dropCartProduct = useStoreActions(
		(action) => action.list.dropCartProduct
	);
	const handleCartListCheckers = useStoreActions(
		(action) => action.list.handleCartListCheckers
	);
	//Thunks
	const saveBuy = useStoreActions((action) => action.list.saveBuy);
	//LocalState
	const [cartProductList, setCartProductList] = useState(cartList.products);
	//Navigate
	const navigate = useNavigate();

	//fucntions
	const manageDelete = (id: string) => {
		dropCartProduct(id);
		setCartProductList(cartList.products);
	};
	const manageCheckers = (id: string, field: string, value: boolean) => {
		handleCartListCheckers({ id, field, value });
		setCartProductList(cartList.products);
	};
	const manageSaveBuy = () => {
		const res = saveBuy({ ...cartList, registerDate: startDate });
		if (res) {
			navigate("/home");
		}
	};
	return (
		<div className="Cart">
			<div className="Cart_Header">
				<h1>{cartList.name}</h1>
			</div>
			<div className="Cart_Date">
				<h1>Ticket Day</h1>
				<ReactDatePicker
					selected={startDate}
					onChange={(date: Date) => setStartDate(date)}
				/>
			</div>
			<div className="Cart_Body">
				<div className="Cart_Body_Products">
					{cartProductList?.map((product) => (
						<div key={product._id} className="Cart_Body_Products_Product">
							<p style={product.discarted ? { backgroundColor: "red" } : {}}>
								{product.name}
							</p>
							<p>{product.description}</p>
							<p>
								{product.units} {product.typeUnit} - ${product.price}
							</p>
							<button onClick={() => manageDelete(product._id)}>
								<AiFillDelete />
							</button>
							<div className="Cart_Body_Products_Product_checkbox">
								<div className="checkbox">
									<label>Descartado</label>
									<input
										type="checkbox"
										name="encontrado"
										id="1"
										checked={product.discarted}
										onChange={() => {
											manageCheckers(
												product._id,
												"discarted",
												!product.discarted
											);
										}}
									/>
								</div>
								<div className="checkbox">
									<label>Encontrado</label>
									<input
										type="checkbox"
										name="noEncontrado"
										id="2"
										checked={product.founded}
										onChange={() => {
											manageCheckers(product._id, "founded", !product.founded);
										}}
									/>
								</div>
							</div>
						</div>
					))}
				</div>
				<div className="Cart_Body_Totals">
					{cartList.storeTotals?.map((store) => (
						<div key={store.store._id} className="Cart_Body_Totals_Total">
							<p>{store.store.name}</p>
							<p>{`$${store.total}`}</p>
						</div>
					))}
					<div className="Cart_Body_Totals_Total">
						<p>TOTAL</p>
						<p>{`$${cartList.total}`}</p>
					</div>
					<button onClick={manageSaveBuy}>Make Ticket</button>
				</div>
			</div>
		</div>
	);
}
