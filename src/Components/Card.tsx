import { Product } from "../models/product";
import { useStoreActions } from "../hooks";

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

	//Functions
	const addList = () => {
		setProductSelected(data);
		setShowModalAddList(true);
	};

	return (
		<div className="Card">
			<p>heart icon</p>
			<img src="" alt="" />
			<p>{data.name}</p>
			<h3>
				$ {data.price} - {data.units} {data.typeUnit}
			</h3>
			<p>{data.description}</p>

			<p>{data.store.name}</p>
			<button>Compare</button>
			<button onClick={addList}>Add to list</button>
		</div>
	);
}
