import { useState } from "react";
import { List } from "../models/list";

import { IoIosArrowDropright, IoIosArrowDropdown } from "react-icons/io";
import { MdOutlineDeleteForever } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";

import "../Styles/RowList.scss";
import { useStoreActions } from "../hooks";

type Props = { data: List };

export default function RowList({ data }: Props) {
	//Actions
	const setShowModalAddList = useStoreActions(
		(action) => action.list.setShowModalAddList
	);
	const setListSelected = useStoreActions(
		(action) => action.list.setListSelected
	);
	//Thunks
	const deleteList = useStoreActions((action) => action.list.deleteList);
	const getLists = useStoreActions((action) => action.list.getLists);

	//LocalState
	const [selected, setSelected] = useState(false);

	const sumbitDelete = () => {
		const res = deleteList({ _id: data._id });
		if (res) {
			setSelected(false);
			getLists({});
		}
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
					<button onClick={sumbitDelete}>
						<MdOutlineDeleteForever />
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
							<button>
								<MdOutlineDeleteForever />
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
