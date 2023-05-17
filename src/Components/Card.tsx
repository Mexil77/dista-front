import { Product } from "../models/product";
import { useStoreActions } from "../hooks";
import { Link } from "react-router-dom";

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
	const setTicketProduct = useStoreActions(
		(action) => action.ticket.setTicketProduct
	);

	//Functions
	const addList = () => {
		setProductSelected(data);
		setShowModalAddList(true);
	};
	const addToCartList = () => {
		setTicketProduct({ ...data });
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
			<Link
				to={`/product/detail`}
				onClick={() => {
					setProductSelected(data);
				}}
				className="CleanLink"
			>
				Compare
			</Link>
			<button onClick={addList}>Add to list</button>
			<button onClick={addToCartList}>
				<AiOutlineShoppingCart />
			</button>
		</div>
	);
}
