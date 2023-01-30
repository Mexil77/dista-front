export enum UserStatusEnum {
	active = "active",
	inactive = "inactive",
	deleted = "deleted",
	pendingEmail = "pendingEmail",
	pendingConfig = "pendingConfig",
}

export const UserStatusEnumAsArray = Object.keys(
	UserStatusEnum
) as UserStatusEnum[];
