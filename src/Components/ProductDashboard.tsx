import FilterBar from "./FilterBar";
import Grid from "./Grid";

import "../Styles/ProductDashboard.scss";

export default function ProductDashboard() {
	return (
		<div className="ProductDashboard">
			<FilterBar />
			<Grid />
		</div>
	);
}
