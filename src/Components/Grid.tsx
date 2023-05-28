import Card from "./Card";
import { useStoreState } from "../hooks";

import "../Styles/Grid.scss";
import { Product } from "../models/product";

export default function Grid() {
	//State
	const listProducts = useStoreState((state) => state.product.listProducts);
	return (
		<div className="Grid">
			{listProducts.docs.map((product: Product) => (
				<Card key={product._id} data={product} />
			))}
		</div>
	);
}
