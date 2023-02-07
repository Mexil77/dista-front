import Card from "./Card";
import { Product } from "../models/product";

import "../Styles/Grid.scss";

type Props = {
	data: Product[];
};

export default function Grid({ data }: Props) {
	return (
		<div className="Grid">
			{data.map((d) => (
				<Card key={d._id} data={d} />
			))}
		</div>
	);
}
