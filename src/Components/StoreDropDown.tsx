import { useStoreState } from "../hooks";

type Props = {
	defaultField: { text: string; value: string };
	storeSelected: string;
	onFiledChange: any;
};

export default function StoreDropDown({
	defaultField,
	storeSelected,
	onFiledChange,
}: Props) {
	const listStores = useStoreState((store) => store.store.listStores);
	return (
		<select
			name="storeSelect"
			id="storeSelect"
			value={storeSelected}
			onChange={onFiledChange}
		>
			{listStores.docs.map((store) => (
				<option key={store._id} value={store?._id}>
					{store.name}
				</option>
			))}
			<option value={defaultField.value}>{defaultField.text}</option>
		</select>
	);
}
