import { inject, injectable } from 'tsyringe';
import { ISuppliersRepository } from '../../infra/repositories/suppliers.repository';
import { Supplier } from '../models/supplier.model';
import { ErrorMapper } from '../../infra/cross/errorMapper';
import { SupplierListParametersType } from '../../infra/cross/filterParamsTypes';

export interface ISuppliersService {
	getSupplier(id: string): Promise<Supplier>;
	listSuppliers(parameters?: SupplierListParametersType): Promise<Supplier[]>;
	createSupplier(supplier: Supplier): Promise<void>;
	updateSupplier(id: string, supplier: Supplier): Promise<void>;
	deleteSupplier(id: string): Promise<void>;
}

@injectable()
export class SuppliersService implements ISuppliersService {

	private readonly suppliersRepository: ISuppliersRepository;

	constructor(@inject('SuppliersRepository') repository: ISuppliersRepository) {
		this.suppliersRepository = repository;
	}

	async getSupplier(id: string): Promise<Supplier> {

		try {

			return await this.suppliersRepository.get(id);

		} catch (error: any) {

			if (error instanceof ErrorMapper) throw error;
			throw new ErrorMapper('SUPPLIER_GET_ERROR');

		}

	}

	async listSuppliers(parameters?: SupplierListParametersType): Promise<Supplier[]> {

		try {

			return await this.suppliersRepository.list(parameters);

		} catch (error: any) {

			throw new ErrorMapper('SUPPLIER_LIST_ERROR');

		}

	}

	async createSupplier(supplier: Supplier): Promise<void> {

		try {

			await this.suppliersRepository.create(supplier);

		} catch (error: any) {

			if (error instanceof ErrorMapper) throw error;
			throw new ErrorMapper('SUPPLIER_NOT_CREATED');

		}

	}

	async updateSupplier(id: string, supplier: Supplier): Promise<void> {

		try {

			await this.suppliersRepository.update(id, supplier);

		} catch (error: any) {

			if (error instanceof ErrorMapper) throw error;
			throw new ErrorMapper('SUPPLIER_NOT_UPDATED');

		}

	}

	async deleteSupplier(id: string): Promise<void> {

		try {

			await this.suppliersRepository.delete(id);
		} catch (error: any) {

			if (error instanceof ErrorMapper) throw error;
			throw new ErrorMapper('SUPPLIER_NOT_DELETED');

		}

	}

}
