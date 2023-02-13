import { useEffect } from "react";

export default function OutsideAlerter(
	ref: any,
	exectFunction: any,
	value: any
) {
	useEffect(() => {
		function handleClickOutside(event: any) {
			if (ref.current && !ref.current.contains(event.target)) {
				exectFunction(value);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref, exectFunction, value]);
}
