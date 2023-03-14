import { List } from "../models/list";
import RowList from "./RowList";

import "../Styles/GridList.scss";

type Props = {
	data: List[];
};

export default function GridList({ data }: Props) {
	return (
		<div className="GridList">
			{data.map((d) => (
				<RowList key={d._id} data={d} />
			))}
		</div>
	);
}
