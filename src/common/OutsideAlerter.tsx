import { useEffect } from "react";
import { useStoreActions } from "../hooks";

export default function OutsideAlerter(
	ref: any,
	exectFunction: any,
	value: any
) {
	//Actions
	const setProductSelected = useStoreActions(
		(action) => action.list.setProductSelected
	);
	const setListSelected = useStoreActions(
		(action) => action.list.setListSelected
	);

	useEffect(() => {
		function handleClickOutside(event: any) {
			if (ref.current && !ref.current.contains(event.target)) {
				exectFunction(value);
				setProductSelected({});
				setListSelected({});
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref, exectFunction, value, setProductSelected, setListSelected]);
}
