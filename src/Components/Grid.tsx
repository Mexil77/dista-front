import Card from "./Card";
import { useStoreState } from "../hooks";

import "../Styles/Grid.scss";

export default function Grid() {
	//State
	const products = useStoreState((state) => state.product.listProducts);
	return (
		<div className="Grid">
			{products.docs.map((d) => (
				<Card key={d._id} data={d} />
			))}
		</div>
	);
}
