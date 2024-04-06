import { inject, injectable } from 'tsyringe';
import { IOrdersRepository } from '../../infra/repositories/orders.repository';
import { IMovementsRepository } from '../../infra/repositories/movements.repository';
import { Order, OrderStatus } from '../models/order.model';
import { Movement, MovementType } from '../models/movement.model';
import { ErrorMapper } from '../../infra/cross/errorMapper';

export interface IOrdersService {
	getOrder(id: string): Promise<Order>;
	listOrders(): Promise<Order[]>;
	createOrder(order: Order): Promise<void>;
	updateOrderStatus(id: string, status: OrderStatus, userId: string): Promise<void>;
}

@injectable()
export class OrdersService implements IOrdersService {

	private readonly ordersRepository: IOrdersRepository;
	private readonly movementsRepository: IMovementsRepository;

	constructor(
		@inject('OrdersRepository') ordersRepository: IOrdersRepository,
		@inject('MovementsRepository') movementsRepository: IMovementsRepository,
	) {
		this.ordersRepository = ordersRepository;
		this.movementsRepository = movementsRepository;
	}

	async getOrder(id: string): Promise<Order> {

		try {

			return await this.ordersRepository.get(id);

		} catch (error: any) {

			if (error instanceof ErrorMapper) throw error;
			throw new ErrorMapper('ORDER_GET_ERROR');

		}

	}

	async listOrders(): Promise<Order[]> {

		try {

			return await this.ordersRepository.list();

		} catch (error: any) {

			throw new ErrorMapper('ORDER_LIST_ERROR');

		}

	}

	async createOrder(order: Order): Promise<void> {

		try {

			await this.ordersRepository.create(order);

		} catch (error: any) {

			if (error instanceof ErrorMapper) throw error;
			throw new ErrorMapper('ORDER_NOT_CREATED');

		}

	}

	async updateOrderStatus(id: string, status: OrderStatus, userId: string): Promise<void> {

		try {
			const orderData = await this.ordersRepository.get(id);

			if (orderData.status !== OrderStatus.PENDING) throw new ErrorMapper('ORDER_STATUS_BLOCKED');
			await this.ordersRepository.updateStatus(id, status);

			if (status === OrderStatus.COMPLETE) {

				const movements: Movement[] = orderData.orderItems.map((orderItem) => {

					const movement = new Movement();
					movement.description = `Pedido #${orderData.code}`;
					movement.type = MovementType.IN;
					movement.quantity = orderItem.quantity;
					movement.productId = orderItem.productId;
					movement.userId = userId;

					return movement;

				});

				await this.movementsRepository.batchCreate(movements);
			}

		} catch (error: any) {

			if (error instanceof ErrorMapper) throw error;
			throw new ErrorMapper('ORDER_STATUS_NOT_UPDATED');

		}

	}

}
