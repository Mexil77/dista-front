import "../Styles/Cart.scss";
import { useStoreState, useStoreActions } from "../hooks";
import { useEffect, useState } from "react";

import { AiFillDelete } from "react-icons/ai";

export default function Cart() {
	//State
	const cartList = useStoreState((state) => state.list.cartList);
	//Actions
	const dropCartProduct = useStoreActions(
		(action) => action.list.dropCartProduct
	);
	//Thunks
	const saveBuy = useStoreActions((action) => action.list.saveBuy);
	//LocalState
	const [cartProductList, setCartProductList] = useState(cartList.products);

	return (
		<div className="Cart">
			<div className="Cart_Header">
				<h1>{cartList.name}</h1>
			</div>
			<div className="Cart_Body">
				<div className="Cart_Body_Products">
					{cartProductList?.map((product) => (
						<div key={product._id} className="Cart_Body_Products_Product">
							<p>{product.name}</p>
							<p>{product.description}</p>
							<p>
								{product.units} {product.typeUnit} - ${product.price}
							</p>
							<button
								onClick={() => {
									dropCartProduct(product._id);
									setCartProductList(cartList.products);
								}}
							>
								<AiFillDelete />
							</button>
							<div className="Cart_Body_Products_Product_checkbox">
								<div className="checkbox">
									<label>Descartado</label>
									<input type="checkbox" name="encontrado" id="1" />
								</div>
								<div className="checkbox">
									<label>Encontrado</label>
									<input type="checkbox" name="noEncontrado" id="2" />
								</div>
							</div>
						</div>
					))}
				</div>
				<div className="Cart_Body_Totals">
					<p>{`$${cartList.total}`}</p>
					<button>ticket</button>
				</div>
			</div>
		</div>
	);
}
