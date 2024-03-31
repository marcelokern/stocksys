import { inject, injectable } from 'tsyringe';
import { IPrismaService } from '../data/prisma/prisma.service';
import { Order, OrderStatus } from '../../domain/models/order.model';
import { DataMapper } from '../data/prisma/data.mapper';
import { ErrorMapper } from '../cross/errorMapper';

export interface IOrdersRepository {
	get(id: string): Promise<Order>;
	list(): Promise<Order[]>;
	create(order: Order): Promise<void>;
	updateStatus(id: string, status: string): Promise<void>;
}

@injectable()
export class OrdersRepository implements IOrdersRepository {
	
	private readonly prismaService: IPrismaService;

	constructor(@inject('PrismaService') service: IPrismaService) {
		this.prismaService = service;
	}

	async get(id: string): Promise<Order> {
		
		try {
			
			const data = await this.prismaService.orders.findUniqueOrThrow({
				where: { id: 'a6a491b5-b527-4bcb-8f6a-7d45cf5a939a' },
				include: {
					supplier: true,
					orderItems: {
						include: {
							product: {
								select: {
									code: true,
									description: true,
									measureUnit: true
								}
							}
						}
					}
				},
			});
			
			return DataMapper.ordersGetDataMapper(data);

		} catch (error: any) {

			console.log(error)

			if (error.code && error.code === 'P2025') throw new ErrorMapper('ORDER_NOT_FOUND');
			throw new ErrorMapper('ORDER_GET_ERROR');

		}

	}

	async list(): Promise<Order[]> {
		
		const data = await this.prismaService.orders.findMany({
			include: {
				supplier: true
			},
			orderBy: {
				date: 'desc' 
			}
		});
		
		return data.map(x => DataMapper.ordersListDataMapper(x));
		
	}

	async create(order: Order): Promise<void> {

		try {
			
			await this.prismaService.orders.create({
				data: { 
					...order,
					orderItems: {
						create: order.orderItems.map((orderItem) => ({ ...orderItem }))
					},
					supplier: undefined
				},
			});

		} catch (error: any) {

			if (error.code && error.code === 'P2002') throw new ErrorMapper('ORDER_ITEMS_NOT_UNIQUE');
			throw new ErrorMapper('ORDER_NOT_CREATED');

		}

	}

	async updateStatus(id: string, status: OrderStatus): Promise<void> {
		
		try {
			
			await this.prismaService.orders.update({
				data: {
					status: {
						set: status 
					} 
				},
				where: { id } 
			});

		} catch (error: any) {

			if (error.code && error.code === 'P2025') throw new ErrorMapper('ORDER_NOT_FOUND');
			throw new ErrorMapper('ORDER_STATUS_NOT_UPDATED');

		}
	}
}
