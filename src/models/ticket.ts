import { TicketProduct } from "./product";
import { User } from "./user";
import { storeTotal } from "./store";

export class Ticket {
	public _id: string;
	public user: User;
	public registerDate: Date;
	public discountRate: number;
	public products: TicketProduct[];
	public storeTotals: storeTotal[];
	public total: number;

	constructor(info: any) {
		this._id = info._id;
		this.user = info.user;
		this.registerDate = info.registerDate;
		this.discountRate = info.discountRate;
		this.products = info.products;
		this.storeTotals = info.storeTotals;
		this.total = info.total;
	}
}
