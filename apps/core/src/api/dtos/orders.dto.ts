import { OrderStatus } from '../../domain/models/order.model';

export class GetOrderDto {
	public id: string;
	public code: number;
	public supplierCNPJ: string;
	public supplierCorporateName: string;
	public date: Date;
	public status: OrderStatus;
	public orderItems: GetOrderItemDto[];
}

export class ListOrderDto {
	public id: string;
	public code: number;
	public supplierCNPJ: string;
	public supplierCorporateName: string;
	public date: Date;
	public status: OrderStatus;
}

export class CreateOrderDto {
	public supplierId: string;
	public orderItems: CreateOrderItemDto[];
}

export class GetOrderItemDto {
	public code: string;
	public description: string;
	public measureUnit: string;
	public quantity: number;
}

export class CreateOrderItemDto {
	public productId: string;
	public quantity: number;
}
