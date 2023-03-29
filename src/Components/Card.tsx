import { Product } from "../models/product";
import { useStoreActions } from "../hooks";

import { AiFillHeart, AiOutlineShoppingCart } from "react-icons/ai";

import "../Styles/Card.scss";

type Props = { data: Product };

export default function Card({ data }: Props) {
	//Actions
	const setShowModalAddList = useStoreActions(
		(action) => action.list.setShowModalAddList
	);
	const setProductSelected = useStoreActions(
		(action) => action.list.setProductSelected
	);
	const setCartProduct = useStoreActions(
		(action) => action.list.setCartProduct
	);

	//Functions
	const addList = () => {
		setProductSelected(data);
		setShowModalAddList(true);
	};
	const addToCartList = () => {
		setCartProduct(data);
	};

	return (
		<div className="Card">
			<p>
				<AiFillHeart />
			</p>
			<img src="" alt="" />
			<p>{data.name}</p>
			<h3>
				$ {data.price} - {data.units} {data.typeUnit}
			</h3>
			<p>{data.description}</p>

			<p>{data.store.name}</p>
			<button>Compare</button>
			<button onClick={addList}>Add to list</button>
			<button onClick={addToCartList}>
				<AiOutlineShoppingCart />
			</button>
		</div>
	);
}
