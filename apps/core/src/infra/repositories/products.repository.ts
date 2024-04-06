import { inject, injectable } from 'tsyringe';
import { IPrismaService } from '../data/prisma/prisma.service';
import { Product } from '../../domain/models/product.model';
import { MovementType } from '../../domain/models/movement.model';
import { ErrorMapper } from '../cross/errorMapper';
import { DataMapper } from '../data/prisma/data.mapper';

export interface IProductsRepository {
	get(id: string): Promise<Product>;
	list(parameters?: any): Promise<Product[]>;
	create(product: Product): Promise<void>;
	update(id: string, Product: Product): Promise<void>;
	updateBalance(id: string, movementType: MovementType, quantity: number): Promise<void>;
	delete(id: string): Promise<void>;
}

@injectable()
export class ProductsRepository implements IProductsRepository {

	private readonly prismaService: IPrismaService;

	constructor(@inject('PrismaService') service: IPrismaService) {
		this.prismaService = service;
	}

	async get(id: string): Promise<Product> {

		try {

			const data = await this.prismaService.products.findUniqueOrThrow({
				where: { id },
				include: { supplier: true }
			});

			return DataMapper.productDataMapper(data);

		} catch (error: any) {

			if (error.code && error.code === 'P2025') throw new ErrorMapper('PRODUCT_NOT_FOUND');
			throw new ErrorMapper('PRODUCT_GET_ERROR');

		}
	}

	async list(parameters?: any): Promise<Product[]> {

		let filter: any = {};

		if (parameters?.productsIds && parameters?.productsIds.length > 0) filter.id = { in: parameters?.productsIds }
		if (parameters?.onlyCriticalItems) filter.balance = { lte: this.prismaService.products.fields.safetyStock }

		const data = await this.prismaService.products.findMany({
			include: { supplier: true },
			where: filter,
			orderBy: { description: 'asc' }
		})

		return data.map(x => DataMapper.productDataMapper(x));

	}

	async create(product: Product): Promise<void> {

		try {

			await this.prismaService.products.create({
				data: { ...product, supplier: undefined }
			});

		} catch (error: any) {

			if (error.code && error.code === 'P2002') throw new ErrorMapper('PRODUCT_NOT_UNIQUE');
			if (error.code && error.code === 'P2003') throw new ErrorMapper('SUPPLIER_NOT_FOUND');
			throw new ErrorMapper('PRODUCT_NOT_CREATED');

		}
	}

	async update(id: string, product: Product): Promise<void> {

		try {

			await this.prismaService.products.update({
				data: { ...product, supplier: undefined },
				where: { id }
			});

		} catch (error: any) {

			if (error.code && error.code === 'P2025') throw new ErrorMapper('PRODUCT_NOT_FOUND');
			if (error.code && error.code === 'P2002') throw new ErrorMapper('PRODUCT_NOT_UNIQUE');
			if (error.code && error.code === 'P2003') throw new ErrorMapper('SUPPLIER_NOT_FOUND');
			throw new ErrorMapper('PRODUCT_NOT_UPDATED');

		}

	}

	async updateBalance(id: string, movementType: MovementType, quantity: number): Promise<void> {

		try {

			switch (movementType) {
				case MovementType.IN:
					await this.prismaService.products.update({
						data: {
							balance: {
								increment: quantity
							}
						},
						where: { id }
					});
					break;
				case MovementType.OUT:
					await this.prismaService.products.update({
						data: {
							balance: {
								decrement: quantity
							}
						},
						where: { id }
					});
					break;
				case MovementType.BAL:
					await this.prismaService.products.update({
						data: {
							balance: {
								set: quantity
							}
						},
						where: { id }
					});
					break;
			}

		} catch (error: any) {

			if (error.code && error.code === 'P2025') throw new ErrorMapper('PRODUCT_NOT_FOUND');
			throw new ErrorMapper('PRODUCT_BALANCE_NOT_UPDATED');

		}

	}

	async delete(id: string): Promise<void> {

		try {

			await this.prismaService.products.delete({ where: { id } });

		} catch (error: any) {

			if (error.code && error.code === 'P2025') throw new ErrorMapper('PRODUCT_NOT_FOUND');
			if (error.code && error.code === 'P2003') throw new ErrorMapper('PRODUCT_HAS_MOVEMENTS');
			throw new ErrorMapper('PRODUCT_NOT_DELETED');

		}

	}

}
