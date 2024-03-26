import { inject, injectable } from "tsyringe";
import { ErrorMapper } from "../../../infra/cross/errorMapper";
import { ISuppliersRepository } from "../../../infra/repositories/suppliers/suppliers.repository";
import { ISupplier } from "../../models/supplier/supplier.model";

export interface ISuppliersService {

    getSupplier(id: string): Promise<ISupplier>;
    listSuppliers(): Promise<ISupplier[]>;
    createSupplier(supplier: ISupplier): Promise<void>;
    updateSupplier(id: string, supplier: ISupplier): Promise<void>;
    deleteSupplier(id: string): Promise<void>;

}

@injectable()
export class SuppliersService implements ISuppliersService {

    private readonly suppliersRepository: ISuppliersRepository;

    constructor(@inject('SuppliersRepository') repository: ISuppliersRepository) {
        this.suppliersRepository = repository
    }

    async listSuppliers(): Promise<ISupplier[]> {

        try {

            return await this.suppliersRepository.list();

        } catch (error: any) {

            throw new ErrorMapper('SUPPLIER_LIST_ERROR');

        }

    };

    async getSupplier(id: string): Promise<ISupplier> {

        try {

            return await this.suppliersRepository.get(id);

        } catch (error: any) {

            if (error instanceof ErrorMapper) throw error;
            throw new ErrorMapper('SUPPLIER_NOT_CREATED');

        }

    }

    async createSupplier(supplier: ISupplier): Promise<void> {

        try {

            await this.suppliersRepository.create(supplier);

        } catch (error: any) {

            if (error instanceof ErrorMapper) throw error;
            throw new ErrorMapper('SUPPLIER_NOT_CREATED');

        }

    };

    async updateSupplier(id: string, supplier: ISupplier): Promise<void> {

        try {

            await this.suppliersRepository.update(id, supplier);

        } catch (error: any) {

            if (error instanceof ErrorMapper) throw error;
            throw new ErrorMapper('SUPPLIER_NOT_UPDATED');

        }

    };

    async deleteSupplier(id: string): Promise<void> {

        try {

            await this.suppliersRepository.delete(id);

        } catch (error: any) {

            if (error instanceof ErrorMapper) throw error;
            throw new ErrorMapper('SUPPLIER_NOT_DELETED');

        }

    }

}

