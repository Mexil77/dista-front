import "../Styles/Cart.scss";
import { useStoreState, useStoreActions } from "../hooks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactDatePicker from "react-datepicker";

import { AiFillDelete } from "react-icons/ai";
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
	const handleTicketListCheckers = useStoreActions(
		(action) => action.ticket.handleTicketListCheckers
	);
	//Thunks
	const saveBuy = useStoreActions((action) => action.ticket.saveBuy);
	//LocalState
	const [ticketProductList, setCartProductList] = useState(ticketList.products);
	//Navigate
	const navigate = useNavigate();

	//fucntions
	const manageDelete = (id: string) => {
		dropTicketProduct(id);
		setCartProductList(ticketList.products);
	};
	const manageCheckers = (id: string, field: string, value: boolean) => {
		handleTicketListCheckers({ id, field, value });
		setCartProductList(ticketList.products);
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
								style={
									ticketProduct.discarted ? { backgroundColor: "red" } : {}
								}
							>
								{ticketProduct.product.name}
							</p>
							<p>{ticketProduct.product.description}</p>
							<p>
								{ticketProduct.product.units} {ticketProduct.product.typeUnit} -
								${ticketProduct.product.price}
							</p>
							<button onClick={() => manageDelete(ticketProduct.product._id)}>
								<AiFillDelete />
							</button>
							<div className="Cart_Body_Products_Product_checkbox">
								<div className="checkbox">
									<label>Descartado</label>
									<input
										type="checkbox"
										name="encontrado"
										id="1"
										checked={ticketProduct.discarted}
										onChange={() => {
											manageCheckers(
												ticketProduct.product._id,
												"discarted",
												!ticketProduct.discarted
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
										checked={ticketProduct.founded}
										onChange={() => {
											manageCheckers(
												ticketProduct.product._id,
												"founded",
												!ticketProduct.founded
											);
										}}
									/>
								</div>
							</div>
						</div>
					))}
				</div>
				<div className="Cart_Body_Totals">
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
