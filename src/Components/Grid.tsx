import Card from "./Card";
import { useStoreState } from "../hooks";

import "../Styles/Grid.scss";
import { Product } from "../models/product";

export default function Grid() {
	//State
	const products = useStoreState((state) => state.product.listProducts);
	return (
		<div className="Grid">
			{products.docs.map((product: Product) => (
				<Card key={product._id} data={product} />
			))}
		</div>
	);
}
