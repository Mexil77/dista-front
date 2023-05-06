export enum TypeProductEnum {
	Units = "Units",
	kg = "Kg",
	g = "g",
	lt = "lt",
}

export const TypeProductEnumAsArray = Object.keys(
	TypeProductEnum
) as TypeProductEnum[];
