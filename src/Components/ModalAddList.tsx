import { useState, useRef } from "react";
import { useStoreState, useStoreActions } from "../hooks";
import OutsideAlerter from "../common/OutsideAlerter";

import { IoAddCircleOutline } from "react-icons/io5";
import { AiOutlineEdit } from "react-icons/ai";

import "../Styles/ModalAddList.scss";
import { List } from "../models/list";

export default function ModalAddList() {
	//Refs
	const wrapperRef = useRef(null);

	//State
	const listLists = useStoreState((state) => state.list.listLists);
	const showModalAddList = useStoreState(
		(state) => state.list.showModalAddList
	);
	const listSelected = useStoreState((state) => state.list.listSelected);
	const productSelected = useStoreState((state) => state.list.productSelected);
	//Actions
	const setShowModalAddList = useStoreActions(
		(action) => action.list.setShowModalAddList
	);
	//Thunks
	const saveModalAddList = useStoreActions(
		(action) => action.list.saveModalAddList
	);
	const saveModalEditList = useStoreActions(
		(action) => action.list.saveModalEditList
	);
	const getLists = useStoreActions((action) => action.list.getLists);

	//Local State
	const [modalListState, setModalListState] = useState({
		listSelect: listLists.docs.length === 0 ? "new" : listLists.docs[0]._id,
		listName: "",
	});

	//Functions
	const prepareDataForm = () => {
		return {
			listState: modalListState.listSelect === "new",
			listName:
				modalListState.listSelect === "new" || listSelected._id
					? modalListState.listName
					: "",
			listId: listSelected._id
				? listSelected._id
				: modalListState.listSelect === "new"
				? ""
				: modalListState.listSelect,
			listProduct: productSelected,
		};
	};
	const submitForm = async () => {
		const dataForm = prepareDataForm();
		let res;
		if (listSelected._id) {
			res = await saveModalEditList(dataForm);
		} else {
			res = await saveModalAddList(dataForm);
		}
		if (res) {
			setModalListState({
				...modalListState,
				listName: "",
			});
			getLists({});
			setShowModalAddList(false);
		}
	};
	const onFiledChange = (e: any) => {
		let value = e.target.value;
		setModalListState({ ...modalListState, [e.target.id]: value });
	};
	OutsideAlerter(wrapperRef, setShowModalAddList, false);

	return (
		<div
			className="ModalAddList"
			ref={wrapperRef}
			style={{ display: showModalAddList ? "flex" : "none" }}
		>
			<h1>
				{!listSelected._id
					? `Add ${productSelected.name} to List`
					: "New list name"}
			</h1>
			{!listSelected._id && (
				<select
					name="listSelect"
					id="listSelect"
					value={modalListState.listSelect}
					onChange={onFiledChange}
				>
					{listLists.docs.map((list: List) => (
						<option key={list._id} value={list._id}>
							{list.name}
						</option>
					))}
					<option value="new">new</option>
				</select>
			)}
			{(modalListState.listSelect === "new" || listSelected._id) && (
				<input
					id="listName"
					type="text"
					placeholder="Name of list"
					value={modalListState.listName}
					onChange={onFiledChange}
				/>
			)}
			<button onClick={submitForm}>
				{!listSelected._id ? <IoAddCircleOutline /> : <AiOutlineEdit />}
			</button>
		</div>
	);
}
