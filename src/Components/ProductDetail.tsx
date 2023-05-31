import { Link } from "react-router-dom";
import { useStoreState } from "../hooks";

export default function ProductDetail() {
	const productSelected = useStoreState((state) => state.list.productSelected);
	return (
		<div>
			<Link to="/product" className="ClearCleanLink">
				Products
			</Link>
			<h1>Detail</h1>
			<h1>{productSelected.name}</h1>
		</div>
	);
}
