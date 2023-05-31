import { Product } from "../models/product";
import { useStoreActions } from "../hooks";
import { Link } from "react-router-dom";

import {
	AiFillHeart,
	AiOutlineDelete,
	AiOutlineShoppingCart,
} from "react-icons/ai";

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
	const deleteProductToAllLists = useStoreActions(
		(action) => action.list.deleteProductToAllLists
	);
	const setTicketProduct = useStoreActions(
		(action) => action.ticket.setTicketProduct
	);
	const deleteProduct = useStoreActions(
		(action) => action.product.deleteProduct
	);

	//Functions
	const addList = () => {
		setProductSelected(data);
		setShowModalAddList(true);
	};
	const addToCartList = () => {
		setTicketProduct({ ...data });
	};
	const manageDelete = () => {
		deleteProductToAllLists(data);
		deleteProduct(data);
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
				Detail
			</Link>
			<button onClick={addList}>Add to list</button>
			<button onClick={addToCartList}>
				<AiOutlineShoppingCart />
			</button>
			<button onClick={manageDelete}>
				<AiOutlineDelete />
			</button>
		</div>
	);
}
