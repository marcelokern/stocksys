import { randomUUID } from 'crypto';
import { Supplier } from './supplier.model';

export class Product {
	public id: string;
	public code: string;
	public description: string;
	public measureUnit: string;
	public address: string;
	public securityStock: number;
	public repositionTime: number;
	public balance: number;
	public supplierId: string;
	public supplier: Supplier;

	constructor(id?: string) {
		this.id = id || randomUUID();
	}
}
