import { inject, injectable } from 'tsyringe';
import { Request, Response, NextFunction } from 'express';
import { IMovementsService } from '../../domain/services/movements.service';
import { Movement } from '../../domain/models/movement.model';
import { CreateMovementDto, ListMovementDto } from '../dtos/movements.dto';
import { MovementDtoMapper } from '../mappers/movementDto.mapper';

export interface IMovementsController {
	listMovements(request: Request, response: Response, next: NextFunction): Promise<Response | void>;
	createMovement(request: Request, response: Response, next: NextFunction): Promise<Response | void>;
}

@injectable()
export class MovementsController implements IMovementsController {
	
	private readonly movementsService: IMovementsService;

	constructor(@inject('MovementsService') service: IMovementsService) {
		this.movementsService = service;
	}

	async listMovements(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
		
		try {
			
			const movements: Movement[] = await this.movementsService.listMovements();
			const listMovementDto: ListMovementDto[] = movements.map((movement) => MovementDtoMapper.listMovementDtoMapper(movement));
			return response.send(listMovementDto);

		} catch (error: any) {

			return next(error);

		}

	}

	async createMovement(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
		
		try {

			const dto: CreateMovementDto = request.body;
			const movement = MovementDtoMapper.createMovementDtoMapper(dto);
			await this.movementsService.createMovement(movement);
			return response.send({ message: 'Movimentação registrada com sucesso!' });
		
		} catch (error: any) {

			return next(error);

		}

	}

}
