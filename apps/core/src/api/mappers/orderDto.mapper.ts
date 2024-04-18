import { Order, OrderStatus } from '../../domain/models/order.model';
import { OrderItem } from '../../domain/models/orderItem.model';
import { CreateOrderDto, GetOrderDto, GetOrderItemDto, ListOrderDto } from '../dtos/orders.dto';

export class OrderDtoMapper {

	public static getOrderDtoMapper(order: Order): GetOrderDto {
		
		const dto = new GetOrderDto();

		dto.id = order.id;
		dto.code = order.code;
		dto.supplierCNPJ = order.supplier.cnpj;
		dto.supplierCorporateName = order.supplier.corporateName;
		dto.date = order.date;
		dto.status = order.status;
		
		dto.orderItems = order.orderItems.map(item => {

			const orderItemDto = new GetOrderItemDto();
			orderItemDto.code = item.product.code;
			orderItemDto.description = item.product.description;
			orderItemDto.measureUnit = item.product.measureUnit;
			orderItemDto.quantity = item.quantity;
			return orderItemDto;

		});
		
		return dto;

	}

	public static listOrderDtoMapper(order: Order): ListOrderDto {
		
		const dto = new GetOrderDto();

		dto.id = order.id;
		dto.code = order.code;
		dto.supplierCNPJ = order.supplier.cnpj;
		dto.supplierCorporateName = order.supplier.corporateName;
		dto.date = order.date;
		dto.status = order.status;
		
		return dto;

	}

	public static createOrderDtoMapper(dto: CreateOrderDto): Order {
		
		const order = new Order();
		order.supplierId = dto.supplierId;
		
		order.orderItems = dto.orderItems.map(item => {
			
			const orderItem = new OrderItem();
			orderItem.productId = item.productId;
			orderItem.quantity = item.quantity;
			return orderItem
		
		})

		return order;
		
	}

}
