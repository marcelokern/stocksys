import { Movement } from '../../domain/models/movement.model';
import { CreateMovementDto, ListMovementDto } from '../dtos/movements.dto';

export class MovementDtoMapper {

	public static listMovementDtoMapper(movement: Movement): ListMovementDto {

		const dto = new ListMovementDto();

		dto.id = movement.id;
		dto.description = movement.description;
		dto.date = movement.date;
		dto.productCode = movement.product.code;
		dto.productDescription = movement.product.description;
		dto.productMeasureUnit = movement.product.measureUnit;
		dto.quantity = movement.quantity;
		dto.type = movement.type;
		dto.userId = movement.userId;
		dto.userName = movement.user.name;

		return dto;

	}

	public static createMovementDtoMapper(dto: CreateMovementDto, userId: string): Movement {

		const movement = new Movement();

		movement.productId = dto.productId;
		movement.description = dto.description;
		movement.date = dto.date;
		movement.quantity = dto.quantity;
		movement.type = dto.type;
		movement.userId = userId;

		return movement;

	}

}
