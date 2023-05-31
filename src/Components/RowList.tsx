import { useState } from "react";
import { List } from "../models/list";

import { IoIosArrowDropright, IoIosArrowDropdown } from "react-icons/io";
import { MdOutlineDeleteForever } from "react-icons/md";
import { AiOutlineEdit, AiOutlineShoppingCart } from "react-icons/ai";

import "../Styles/RowList.scss";
import { useStoreActions } from "../hooks";

type Props = { data: List };

export default function RowList({ data }: Props) {
	//LocalState
	const [selected, setSelected] = useState(false);
	//Actions
	const setShowModalAddList = useStoreActions(
		(action) => action.list.setShowModalAddList
	);
	const setListSelected = useStoreActions(
		(action) => action.list.setListSelected
	);
	const setCartProduct = useStoreActions(
		(action) => action.ticket.setTicketProduct
	);
	//Thunks
	const deleteList = useStoreActions((action) => action.list.deleteList);
	const deleteProductList = useStoreActions(
		(action) => action.list.deleteProductList
	);
	const getLists = useStoreActions((action) => action.list.getLists);

	//Functions
	const submitDelete = async () => {
		const res = await deleteList({ _id: data._id });
		if (res) {
			setSelected(false);
			getLists({});
		}
	};
	const submitProductDelete = async (productId: string) => {
		const res = await deleteProductList({ listId: data._id, productId });
		if (res) {
			getLists({});
		}
	};
	const addToCartList = () => {
		data.products.map((product) => setCartProduct(product));
	};
	return (
		<div className="RowList">
			<div className="RowList_Header" onClick={() => setSelected(!selected)}>
				<div className="RowList_Header_title">
					{!selected ? <IoIosArrowDropright /> : <IoIosArrowDropdown />}
					<p>{data.name}</p>
				</div>
				<div className="edit_delete_buttons">
					<button
						onClick={() => {
							setListSelected(data);
							setShowModalAddList(true);
						}}
					>
						<AiOutlineEdit />
					</button>
					<button onClick={submitDelete}>
						<MdOutlineDeleteForever />
					</button>
					<button onClick={addToCartList}>
						<AiOutlineShoppingCart />
					</button>
				</div>
			</div>
			<div
				className="RowList_Body"
				style={!selected ? { display: "none" } : { display: "flex" }}
			>
				{data.products.map((product) => (
					<div key={product._id} className="RowList_Body_RowProduct">
						<p>{product.name}</p>
						<p>{product.description}</p>
						<p>
							{product.units} {product.typeUnit} - ${product.price}
						</p>
						<div className="edit_delete_buttons">
							<button
								onClick={() => {
									submitProductDelete(product._id);
								}}
							>
								<MdOutlineDeleteForever />
							</button>
						</div>
					</div>
				))}
				{data.storeTotals.map((store: any) => (
					<div key={store.store._id} className="RowList_Body_RowProduct">
						<p>
							Total {store.store.name}: {store.total}
						</p>
					</div>
				))}
				<div className="RowList_Body_RowProduct">
					<p>{`Total: ${data.total}`}</p>
				</div>
			</div>
		</div>
	);
}
