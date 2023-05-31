import { User } from "./user";
import { Product } from "./product";

export class storeTotal {
	public store: Store;
	public total: Number;

	constructor(info: any) {
		this.store = info.store;
		this.total = info.total;
	}
}

export class Store {
	public _id: string;
	public name: string;
	public user: User;
	public products: Product[];
	public photo: any | undefined;

	constructor(info: any) {
		this._id = info._id;
		this.name = info.name;
		this.user = info.user;
		this.products = info.products;
		this.photo = info.photo;
	}
}
