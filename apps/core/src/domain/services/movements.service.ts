import { inject, injectable } from 'tsyringe';
import { IMovementsRepository } from '../../infra/repositories/movements.repository';
import { IProductsRepository } from '../../infra/repositories/products.repository';
import { Movement } from '../models/movement.model';
import { ErrorMapper } from '../../infra/cross/errorMapper';

export interface IMovementsService {
	listMovements(): Promise<Movement[]>;
	createMovement(movement: Movement): Promise<void>;
}

@injectable()
export class MovementsService implements IMovementsService {
	
	private readonly movementsRepository: IMovementsRepository;
	private readonly productsRepository: IProductsRepository;

	constructor(
		@inject('MovementsRepository') movementsRepository: IMovementsRepository,
		@inject('ProductsRepository') productsRepository: IProductsRepository,
	) {
		this.movementsRepository = movementsRepository;
		this.productsRepository = productsRepository;
	}

	async listMovements(): Promise<Movement[]> {
		
		try {
		
			return await this.movementsRepository.list();
		
		} catch (error: any) {
		
			throw new ErrorMapper('MOVEMENT_LIST_ERROR');
		
		}

	}

	async createMovement(movement: Movement): Promise<void> {
		
		try {
		
			await this.movementsRepository.create(movement);
			await this.productsRepository.updateBalance(movement.productId, movement.type, movement.quantity);
		
		} catch (error: any) {
		
			if (error instanceof ErrorMapper) throw error;
			throw new ErrorMapper('MOVEMENT_NOT_CREATED');
		
		}
	
	}

}
