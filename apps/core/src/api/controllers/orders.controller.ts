import { inject, injectable } from 'tsyringe';
import { Request, Response, NextFunction } from 'express';
import { IOrdersService } from '../../domain/services/orders.service';
import { Order } from '../../domain/models/order.model';
import { CreateOrderDto, GetOrderDto, ListOrderDto } from '../dtos/orders.dto';
import { OrderDtoMapper } from '../mappers/orderDto.mapper';

export interface IOrdersController {
	getOrder(request: Request, response: Response, next: NextFunction): Promise<Response | void>;
	listOrders(request: Request, response: Response, next: NextFunction): Promise<Response | void>;
	createOrder(request: Request, response: Response, next: NextFunction): Promise<Response | void>;
	updateOrderStatus(request: Request, response: Response, next: NextFunction): Promise<Response | void>;
}

@injectable()
export class OrdersController implements IOrdersController {

	private readonly ordersService: IOrdersService;

	constructor(@inject('OrdersService') service: IOrdersService) {
		this.ordersService = service;
	}

	async getOrder(request: Request, response: Response, next: NextFunction): Promise<Response | void> {

		try {

			const { id } = request.params;
			const order: Order = await this.ordersService.getOrder(id);
			const dto: GetOrderDto = OrderDtoMapper.getOrderDtoMapper(order);
			return response.send(dto);

		} catch (error: any) {

			return next(error);

		}

	}

	async listOrders(request: Request, response: Response, next: NextFunction): Promise<Response | void> {

		try {

			const orders: Order[] = await this.ordersService.listOrders();
			const listOrdersDto: ListOrderDto[] = orders.map((order) => OrderDtoMapper.listOrderDtoMapper(order));
			return response.send(listOrdersDto);

		} catch (error: any) {

			return next(error);

		}

	}

	async createOrder(request: Request, response: Response, next: NextFunction): Promise<Response | void> {

		try {

			const createOrderDto: CreateOrderDto = request.body;
			const order: Order = OrderDtoMapper.createOrderDtoMapper(createOrderDto);
			await this.ordersService.createOrder(order);
			return response.send({ message: 'Pedido criado com sucesso!' });

		} catch (error: any) {

			return next(error);

		}

	}

	async updateOrderStatus(request: Request, response: Response, next: NextFunction): Promise<Response | void> {

		try {

			const userId = request.user.id;
			const { id } = request.params;
			const { status } = request.body;
			await this.ordersService.updateOrderStatus(id, status, userId);
			return response.send({
				message: status === 'COMPLETE' ? 'Pedido finalizado com sucesso!' : 'Pedido cancelado com sucesso!',
			});

		} catch (error: any) {

			return next(error);

		}

	}

}
