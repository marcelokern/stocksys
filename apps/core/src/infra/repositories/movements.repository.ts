import { inject, injectable } from 'tsyringe';
import { IPrismaService } from '../data/prisma/prisma.service';
import { Movement, MovementType } from '../../domain/models/movement.model';
import { DataMapper } from '../data/prisma/data.mapper';
import { ErrorMapper } from '../cross/errorMapper';

export interface IMovementsRepository {
	list(parameters?: any): Promise<Movement[]>;
	summarize(type: MovementType, parameters?: any): Promise<any>;
	create(movement: Movement): Promise<void>;
	batchCreate(movement: Movement[]): Promise<void>;
}

@injectable()
export class MovementsRepository implements IMovementsRepository {

	private readonly prismaService: IPrismaService;

	constructor(@inject('PrismaService') service: IPrismaService) {
		this.prismaService = service;
	}

	async list(parameters?: any): Promise<Movement[]> {

		let filter: any = {};
		let limit: any = {};

		if (parameters?.productsIds && parameters?.productsIds.length > 0) filter.productId = { in: parameters?.productsIds };
		if (parameters?.limit && Number.isInteger(parameters?.limit)) { limit = { take: parameters?.limit } }

		const data = await this.prismaService.movements.findMany({
			include: {
				user: true,
				product: {
					include: {
						supplier: true
					}
				}
			},
			where: filter,
			orderBy: { date: 'desc' },
			...limit
		})

		return data.map(x => DataMapper.movementDataMapper(x));

	}

	async summarize(type: MovementType, parameters?: any): Promise<any> {

		let filter: any = {};

		if (parameters?.productsIds && parameters?.productsIds.length > 0) filter.productId = { in: parameters?.productsIds }

		const data = await this.prismaService.movements.groupBy({
			by: 'productId',
			_sum: { quantity: true },
			where: { type, ...filter }
		})

		return data.reduce((acc, { _sum, productId }) => ({ ...acc, [productId]: _sum.quantity }), {});

	}

	async create(movement: Movement): Promise<void> {

		try {

			await this.prismaService.movements.create({
				data: { ...movement, product: undefined, user: undefined }
			});

		} catch (error: any) {

			if (error.code && error.code === 'P2003') throw new ErrorMapper('PRODUCT_NOT_FOUND');
			throw new ErrorMapper('MOVEMENT_NOT_CREATED');

		}

	}

	async batchCreate(movements: Movement[]): Promise<void> {

		try {

			await this.prismaService.movements.createMany({
				data: movements.map((movement) => ({ ...movement, product: undefined, user: undefined }))
			});

		} catch (error: any) {

			if (error.code && error.code === 'P2003') throw new ErrorMapper('PRODUCT_NOT_FOUND');
			throw new ErrorMapper('MOVEMENT_NOT_CREATED');

		}

	}

}
