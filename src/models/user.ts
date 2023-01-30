import { LanguageEnum } from "../enums/language.enum";
import { UserStatusEnum } from "../enums/user-status.enum";
import { PermissionOprionsEnum } from "../enums/permission-options.enum";

export interface Permissions {
	readonly key: string;
	readonly options: PermissionOprionsEnum[];
}

export class User {
	public _id: string;
	public email: string;
	public name: string;
	public lastName: string | undefined;
	public userLanguage: LanguageEnum;
	public password: string | undefined;
	public photo: any | undefined;
	public status: string | UserStatusEnum.active;
	public language: LanguageEnum;
	public createdAt: any;
	public permissions: Permissions[];

	constructor(info: any) {
		this._id = info._id;
		this.email = info.email;
		this.name = info.name;
		this.lastName = info.lastName;
		this.userLanguage = info.userLanguage;
		this.password = info.password;
		this.status = info.status;
		this.language = info.language;
		this.createdAt = info.createdAt;
		this.permissions = info.permissions;
	}
}
