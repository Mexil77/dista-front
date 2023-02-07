import { User } from "./user";
import { Store } from "./store";

export class Product {
	public _id: string;
	public name: string;
	public price: number;
	public user: User;
	public store: Store;
	public photo: any | undefined;

	constructor(info: any) {
		this._id = info._id;
		this.name = info.name;
		this.price = info.price;
		this.user = info.user;
		this.store = info.store;
		this.photo = info.photo;
	}
}
