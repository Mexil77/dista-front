import { Product } from "./product";
import { User } from "./user";

export class List {
	public _id: string;
	public name: string;
	public products: Product[];
	public user: User;
	public storeTotals: any;
	public total: Number;

	constructor(info: any) {
		this._id = info._id;
		this.name = info.name;
		this.products = info.products;
		this.user = info.user;
		this.storeTotals = info.storeTotals;
		this.total = info.total;
	}
}
