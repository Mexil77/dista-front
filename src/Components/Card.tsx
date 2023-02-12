import { Product } from "../models/product";

import "../Styles/Card.scss";

type Props = { data: Product };

export default function Card({ data }: Props) {
	return (
		<div className="Card">
			<p>heart icon</p>
			<img src="" alt="" />
			<p>{data.name}</p>
			<h3>
				{data.price} $ - {data.units} {data.typeUnit}
			</h3>
			<p>{data.description}</p>

			<p>{data.store.name}</p>
			<button>Compare</button>
			<button>Add to list</button>
		</div>
	);
}
