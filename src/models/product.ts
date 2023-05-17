import { User } from "./user";
import { Store } from "./store";

export class Product {
	public _id: string;
	public name: string;
	public price: number;
	public units: number;
	public typeUnit: string;
	public description: string;
	public user: User;
	public store: Store;
	public photo: any | undefined;

	constructor(info: any) {
		this._id = info._id;
		this.name = info.name;
		this.price = info.price;
		this.units = info.units;
		this.typeUnit = info.typeUnit;
		this.description = info.description;
		this.user = info.user;
		this.store = info.store;
		this.photo = info.photo;
	}
}

export class TicketProduct {
	public product: Product;
	public discarted: boolean;
	public founded: boolean;
	public discountRate: number;
	public quantity: number;

	constructor(info: any) {
		this.product = info.product;
		this.discarted = info.discarted;
		this.founded = info.founded;
		this.discountRate = info.discountRate;
		this.quantity = info.quantity;
	}
}
