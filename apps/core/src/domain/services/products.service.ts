import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '../../infra/repositories/products.repository';
import { IMovementsRepository } from '../../infra/repositories/movements.repository';
import { Movement, MovementType } from '../models/movement.model';
import { Product } from '../models/product.model';
import { ErrorMapper } from '../../infra/cross/errorMapper';

export interface IProductsService {
	getProduct(id: string): Promise<Product>;
	listProducts(): Promise<Product[]>;
	createProduct(product: Product): Promise<void>;
	updateProduct(id: string, product: Product): Promise<void>;
	deleteProduct(id: string): Promise<void>;
}

@injectable()
export class ProductsService implements IProductsService {
	
	private readonly productsRepository: IProductsRepository;
	private readonly movementsRepository: IMovementsRepository;

	constructor(
		@inject('ProductsRepository') productsRepository: IProductsRepository,
		@inject('MovementsRepository') movementsRepository: IMovementsRepository,
	) {
		this.productsRepository = productsRepository;
		this.movementsRepository = movementsRepository;
	}

	async getProduct(id: string): Promise<Product> {
		
		try {
			
			return await this.productsRepository.get(id);

		} catch (error: any) {
			
			if (error instanceof ErrorMapper) throw error;
			throw new ErrorMapper('PRODUCT_GET_ERROR');
		
		}

	}

	async listProducts(): Promise<Product[]> {
		
		try {
			
			return await this.productsRepository.list();
		
		} catch (error: any) {
			
			throw new ErrorMapper('PRODUCT_LIST_ERROR');
		
		}

	}

	async createProduct(product: Product): Promise<void> {
		
		try {
			
			await this.productsRepository.create(product);

			const movement: Movement = new Movement();
			movement.description = 'Balanço inicial';
			movement.productId = product.id;
			movement.quantity = product.balance;
			movement.type = MovementType.BAL;

			await this.movementsRepository.create(movement);

		} catch (error: any) {
			
			if (error instanceof ErrorMapper) throw error;
			throw new ErrorMapper('PRODUCT_NOT_CREATED');

		}
		
	}

	async updateProduct(id: string, product: Product): Promise<void> {
		
		try {
			
			await this.productsRepository.update(id, product);
		
		} catch (error: any) {
			
			if (error instanceof ErrorMapper) throw error;
			throw new ErrorMapper('PRODUCT_NOT_UPDATED');

		}
	}

	async deleteProduct(id: string): Promise<void> {
		
		try {
			
			await this.productsRepository.delete(id);
		
		} catch (error: any) {

			if (error instanceof ErrorMapper) throw error;
			throw new ErrorMapper('PRODUCT_NOT_DELETED');

		}

	}

}
