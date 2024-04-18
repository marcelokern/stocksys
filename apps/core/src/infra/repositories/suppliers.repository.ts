import { inject, injectable } from 'tsyringe';
import { IPrismaService } from '../data/prisma/prisma.service';
import { Supplier } from '../../domain/models/supplier.model';
import { DataMapper } from '../data/prisma/data.mapper';
import { ErrorMapper } from '../cross/errorMapper';
import { SupplierListParametersType } from '../cross/filterParamsTypes';

export interface ISuppliersRepository {
	get(id: string): Promise<Supplier>;
	list(parameters?: SupplierListParametersType): Promise<Supplier[]>;
	create(supplier: Supplier): Promise<void>;
	update(id: string, supplier: Supplier): Promise<void>;
	delete(id: string): Promise<void>;
}

@injectable()
export class SuppliersRepository implements ISuppliersRepository {

	private readonly prismaService: IPrismaService;

	constructor(@inject('PrismaService') service: IPrismaService) {
		this.prismaService = service;
	}

	async get(id: string): Promise<Supplier> {

		try {

			const data = await this.prismaService.suppliers.findUniqueOrThrow({ where: { id } });
			return DataMapper.supplierDataMapper(data);


		} catch (error: any) {

			if (error.code && error.code === 'P2025') throw new ErrorMapper('SUPPLIER_NOT_FOUND');
			throw new ErrorMapper('SUPPLIER_GET_ERROR');

		}
	}

	async list(parameters?: SupplierListParametersType): Promise<Supplier[]> {

		let filter: any = {};
		if (parameters?.corporateName) filter.corporateName = { contains: parameters?.corporateName, mode: 'insensitive' };

		const data = await this.prismaService.suppliers.findMany({
			where: filter,
			orderBy: { corporateName: 'asc' }
		});

		return data.map(x => DataMapper.supplierDataMapper(x));

	}

	async create(supplier: Supplier): Promise<void> {

		try {

			await this.prismaService.suppliers.create({ data: supplier });

		} catch (error: any) {

			if (error.code && error.code === 'P2002') throw new ErrorMapper('SUPPLIER_NOT_UNIQUE');
			throw new ErrorMapper('SUPPLIER_NOT_CREATED');

		}


	}

	async update(id: string, supplier: Supplier): Promise<void> {

		try {

			await this.prismaService.suppliers.update({ data: supplier, where: { id } });

		} catch (error: any) {

			if (error.code && error.code === 'P2025') throw new ErrorMapper('SUPPLIER_NOT_FOUND');
			if (error.code && error.code === 'P2002') throw new ErrorMapper('SUPPLIER_NOT_UNIQUE');
			throw new ErrorMapper('SUPPLIER_NOT_UPDATED');

		}

	}

	async delete(id: string): Promise<void> {

		try {

			await this.prismaService.suppliers.delete({ where: { id } });

		} catch (error: any) {

			if (error.code && error.code === 'P2025') throw new ErrorMapper('SUPPLIER_NOT_FOUND');
			if (error.code && error.code === 'P2003') throw new ErrorMapper('SUPPLIER_HAS_PRODUCTS');
			throw new ErrorMapper('SUPPLIER_NOT_DELETED');

		}

	}
}
