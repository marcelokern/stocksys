import { randomUUID } from 'crypto';
import { Product } from './product.model';

export enum MovementType {
	IN = 'IN',
	OUT = 'OUT',
	BAL = 'BAL',
}

export class Movement {
	public id: string;
	public description: string;
	public productId: string;
	public product: Product;
	public date: Date;
	public quantity: number;
	public type: MovementType;

	constructor() {
		this.id = randomUUID();
		this.date = new Date();
	}
}
