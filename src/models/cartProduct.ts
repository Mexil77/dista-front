import { Product } from "./product";

export class CartProduct extends Product {
	public discarted: boolean;
	public founded: boolean;

	constructor(info: any) {
		super(info);
		this.discarted = info.discarted;
		this.founded = info.founded;
	}
}
