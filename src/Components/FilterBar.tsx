import { Link } from "react-router-dom";

export default function FilterBar() {
	return (
		<div className="FilterBar">
			<h3>Product</h3>
			<input type="text" />
			<Link to="/add">Add</Link>
			<button>List</button>
			<button>Square</button>
		</div>
	);
}
