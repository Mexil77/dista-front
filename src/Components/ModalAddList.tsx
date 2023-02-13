import { useState, useRef } from "react";
import { useStoreState, useStoreActions } from "../hooks";
import OutsideAlerter from "../common/OutsideAlerter";

import "../Styles/ModalAddList.scss";

export default function ModalAddList() {
	//Refs
	const wrapperRef = useRef(null);

	//State
	const listLists = useStoreState((state) => state.list.listLists);
	const showModalAddList = useStoreState(
		(state) => state.list.showModalAddList
	);
	const productSelected = useStoreState((state) => state.list.productSelected);
	//Actions
	const setShowModalAddList = useStoreActions(
		(action) => action.list.setShowModalAddList
	);
	//Thunks
	const saveModalAddList = useStoreActions(
		(action) => action.list.saveModalAddList
	);
	const getLists = useStoreActions((action) => action.list.getLists);

	//Local State
	const [modalListState, setModalListState] = useState({
		listSelect: listLists.docs.length === 0 ? "new" : listLists.docs[0].name,
		listName: "",
	});

	//Functions
	const prepareDataForm = () => {
		return {
			listState: modalListState.listSelect === "new",
			listName:
				modalListState.listSelect === "new" ? modalListState.listName : "",
			listId:
				modalListState.listSelect === "new" ? "" : modalListState.listSelect,
			listProduct: productSelected?._id,
		};
	};
	const submitForm = async () => {
		const dataForm = prepareDataForm();
		const res = await saveModalAddList(dataForm);
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
			<h1>Add to List</h1>
			<h1>{productSelected.name}</h1>
			<select
				name="listSelect"
				id="listSelect"
				value={modalListState.listSelect}
				onChange={onFiledChange}
			>
				{listLists.docs.map((list) => (
					<option key={list._id} value={list._id}>
						{list.name}
					</option>
				))}
				<option value="new">new</option>
			</select>
			{modalListState.listSelect === "new" && (
				<input
					id="listName"
					type="text"
					placeholder="Name of list"
					value={modalListState.listName}
					onChange={onFiledChange}
				/>
			)}
			<button onClick={submitForm}>Add</button>
		</div>
	);
}
