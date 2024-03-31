import { inject, injectable } from 'tsyringe';
import { IPrismaService } from '../data/prisma/prisma.service';
import { Movement } from '../../domain/models/movement.model';
import { DataMapper } from '../data/prisma/data.mapper';
import { ErrorMapper } from '../cross/errorMapper';

export interface IMovementsRepository {
	list(limit?: number): Promise<Movement[]>;
	create(movement: Movement): Promise<void>;
	batchCreate(movement: Movement[]): Promise<void>;
}

@injectable()
export class MovementsRepository implements IMovementsRepository {
	
	private readonly prismaService: IPrismaService;

	constructor(@inject('PrismaService') service: IPrismaService) {
		this.prismaService = service;
	}

	async list(limit?: number): Promise<Movement[]> {
		
		const data = await this.prismaService.movements.findMany({
			include: { product: { include: { supplier: true } } },
			take: limit,
			orderBy: { date: 'desc' },
		});

		return data.map(x => DataMapper.movementsDataMapper(x));

	}

	async create(movement: Movement): Promise<void> {
		
		try {

			await this.prismaService.movements.create({ 
				data: { ...movement, product: undefined } 
			});
		
		} catch (error: any) {

			if (error.code && error.code === 'P2003') throw new ErrorMapper('PRODUCT_NOT_FOUND');
			throw new ErrorMapper('MOVEMENT_NOT_CREATED');

		}

	}

	async batchCreate(movements: Movement[]): Promise<void> {

		try {

			await this.prismaService.movements.createMany({ 
				data: movements.map((movement) => ({ ...movement, product: undefined })) 
			});
		
		} catch (error: any) {

			if (error.code && error.code === 'P2003') throw new ErrorMapper('PRODUCT_NOT_FOUND');
			throw new ErrorMapper('MOVEMENT_NOT_CREATED');

		}

	}

}
