import "../Styles/Cart.scss";
import { useStoreState, useStoreActions } from "../hooks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactDatePicker from "react-datepicker";

import {
	AiFillCaretDown,
	AiFillCaretUp,
	AiFillDelete,
	AiFillStar,
} from "react-icons/ai";
import { storeTotal } from "../models/store";
import { TicketProduct } from "../models/product";

export default function Cart() {
	const [startDate, setStartDate] = useState<Date>(new Date());
	//State
	const ticketList = useStoreState((state) => state.ticket.ticketList);
	//Actions
	const dropTicketProduct = useStoreActions(
		(action) => action.ticket.dropTicketProduct
	);
	const handleTicketProductState = useStoreActions(
		(action) => action.ticket.handleTicketProductState
	);
	const setTicketListProducts = useStoreActions(
		(action) => action.ticket.setTicketListProducts
	);
	//Thunks
	const saveBuy = useStoreActions((action) => action.ticket.saveBuy);
	//LocalState
	const [ticketProductList, setTicketProductList] = useState<TicketProduct[]>(
		ticketList.products
	);
	//Navigate
	const navigate = useNavigate();

	//fucntions
	const manageDelete = (id: string) => {
		dropTicketProduct(id);
		setTicketProductList(ticketList.products);
	};
	const manageTicketProductState = (
		id: string,
		field: string,
		value: boolean
	) => {
		handleTicketProductState({ id, field, value });
		setTicketProductList(ticketList.products);
	};
	const manageTicketProductInput = (
		inputNumber: any,
		id: string,
		field: string
	) => {
		if (!isNaN(inputNumber) && inputNumber >= 0) {
			if (field === "discountRate" && inputNumber > 100) {
				return;
			}
			const newTicketProducts = ticketProductList.map(
				(ticketProduct: TicketProduct) => {
					if (ticketProduct.product._id === id) {
						let newTicketProduct = { ...ticketProduct, [field]: inputNumber };
						if (field === "quantity" || field === "discountRate") {
							newTicketProduct.totalTicketProduct =
								ticketProduct.product.price *
								newTicketProduct.quantity *
								(100 - newTicketProduct.discountRate) *
								0.01;
						}
						return newTicketProduct;
					}
					return ticketProduct;
				}
			);
			setTicketProductList(newTicketProducts);
			setTicketListProducts(newTicketProducts);
		}
	};
	const manageSaveBuy = () => {
		const res = saveBuy({ ...ticketList, registerDate: startDate });
		if (res) {
			navigate("/home");
		}
	};
	return (
		<div className="Cart">
			<div className="Cart_Header">
				<h1>Cart</h1>
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
					{ticketProductList?.map((ticketProduct: TicketProduct) => (
						<div
							key={ticketProduct.product._id}
							className="Cart_Body_Products_Product"
						>
							<p
								className="Cart_Body_Products_Product_Name"
								style={ticketProduct.founded ? { backgroundColor: "blue" } : {}}
							>
								{ticketProduct.product.name}
							</p>
							<div className="Cart_body_Product_Info">
								<p>
									{ticketProduct.product.description} -{" "}
									{ticketProduct.product.units} {ticketProduct.product.typeUnit}{" "}
									- € {ticketProduct.product.price}
								</p>
							</div>
							<div className="Cart_body_Product_Form">
								<div className="Cart_body_Product_Form_Input">
									<label>Units</label>
									<input
										type="number"
										value={ticketProduct.quantity}
										onChange={(e) =>
											manageTicketProductInput(
												Number(e.target.value),
												ticketProduct.product._id,
												"quantity"
											)
										}
									/>
									<button
										onClick={() => {
											manageTicketProductInput(
												ticketProduct.quantity + 1,
												ticketProduct.product._id,
												"quantity"
											);
										}}
									>
										<AiFillCaretUp />
									</button>
									<button
										onClick={() => {
											manageTicketProductInput(
												ticketProduct.quantity - 1,
												ticketProduct.product._id,
												"quantity"
											);
										}}
									>
										<AiFillCaretDown />
									</button>
								</div>
								<div className="Cart_body_Product_Form_Input">
									<label>Discount %</label>
									<input
										type="number"
										value={ticketProduct.discountRate}
										onChange={(e) =>
											manageTicketProductInput(
												Number(e.target.value),
												ticketProduct.product._id,
												"discountRate"
											)
										}
									/>
								</div>
								<div className="Cart_body_Product_Form_Input">
									<label>Price</label>
									<input
										type="number"
										value={ticketProduct.totalTicketProduct}
										onChange={(e) =>
											manageTicketProductInput(
												Number(e.target.value),
												ticketProduct.product._id,
												"totalTicketProduct"
											)
										}
									/>
								</div>
							</div>
							<div className="Cart_Body_Products_Product_Buttons">
								<button onClick={() => manageDelete(ticketProduct.product._id)}>
									<AiFillDelete />
								</button>
								<button
									onClick={() =>
										manageTicketProductState(
											ticketProduct.product._id,
											"founded",
											!ticketProduct.founded
										)
									}
								>
									<AiFillStar />
								</button>
							</div>
						</div>
					))}
				</div>
				<div className="Cart_Body_Totals">
					<div className="Cart_body_Product_Form_Input">
						<label>Total Discount %</label>
						<input
							type="number"
							value={ticketList.discountRate}
							onChange={(e) => {}}
						/>
					</div>
					{ticketList.storeTotals?.map((store: storeTotal) => (
						<div key={store.store._id} className="Cart_Body_Totals_Total">
							<p>{store.store.name}</p>
							<p>{`$${store.total}`}</p>
						</div>
					))}
					<div className="Cart_Body_Totals_Total">
						<p>TOTAL</p>
						<p>{`$${ticketList.total}`}</p>
					</div>
					<button onClick={manageSaveBuy}>Make Ticket</button>
				</div>
			</div>
		</div>
	);
}
