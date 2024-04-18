import { randomUUID } from 'crypto';
import { Supplier } from './supplier.model';
import { OrderItem } from './orderItem.model';

export enum OrderStatus {
	PENDING = 'PENDING',
	CANCEL = 'CANCEL',
	COMPLETE = 'COMPLETE',
}

export class Order {
	public id: string;
	public code: number;
	public supplierId: string;
	public supplier: Supplier;
	public date: Date;
	public status: OrderStatus;
	public orderItems: OrderItem[];

	constructor() {
		this.id = randomUUID();
		this.date = new Date();
		this.status = OrderStatus.PENDING;
	}
}
