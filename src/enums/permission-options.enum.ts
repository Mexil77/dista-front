export enum PermissionOprionsEnum {
	view = "view",
	create = "create",
	edit = "edit",
	delete = "delete",
}

export const PermissionOprionsEnumAsArray = Object.keys(
	PermissionOprionsEnum
) as PermissionOprionsEnum[];
