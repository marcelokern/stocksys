import { Request, Response, NextFunction } from "express";
import { ISupplier, Supplier } from "../../domain/models/supplier/supplier.model";
import { ICreateSupplierDto } from "../dtos/suppliers/createSupplier.dto";
import { ISuppliersService } from "../../domain/services/suppliers/suppliers.service";
import { ListSupplierDto } from "../dtos/suppliers/listSupplier.dto";
import { GetSupplierDto } from "../dtos/suppliers/getSupplier.dto";
import { inject, injectable } from "tsyringe";

export interface ISuppliersController {
    listSuppliers(request: Request, response: Response, next: NextFunction): Promise<Response | void>;
    getSupplier(request: Request, response: Response, next: NextFunction): Promise<Response | void>
    createSupplier(request: Request, response: Response, next: NextFunction): Promise<Response | void>
    updateSupplier(request: Request, response: Response, next: NextFunction): Promise<Response | void>
    deleteSupplier(request: Request, response: Response, next: NextFunction): Promise<Response | void>
}


@injectable()
export class SuppliersController implements ISuppliersController {

    private readonly suppliersService: ISuppliersService;

    constructor(@inject('SuppliersService') service: ISuppliersService) {
        this.suppliersService = service;
    }

    async listSuppliers(request: Request, response: Response, next: NextFunction) {

        try {

            const suppliers = await this.suppliersService.listSuppliers();
            const listSuppliersDto = suppliers.map(supplier => new ListSupplierDto({ ...supplier }));
            return response.send(listSuppliersDto);

        } catch (error: any) {

            return next(error);

        }

    }

    async getSupplier(request: Request, response: Response, next: NextFunction) {

        try {

            const { id } = request.params;
            const supplier = await this.suppliersService.getSupplier(id);
            return response.send(new GetSupplierDto({ ...supplier }));

        } catch (error: any) {

            return next(error);

        }

    }

    async createSupplier(request: Request, response: Response, next: NextFunction) {

        try {

            const createSupplierDto: ICreateSupplierDto = request.body;
            const supplier: ISupplier = new Supplier({ ...createSupplierDto, id: '' });
            await this.suppliersService.createSupplier(supplier);
            return response.send({ message: 'Fornecedor cadastrado com sucesso!' });

        } catch (error: any) {

            return next(error);

        }

    };

    async updateSupplier(request: Request, response: Response, next: NextFunction) {

        try {

            const { id } = request.params;
            const updateSupplierDto: ICreateSupplierDto = request.body;
            const supplier: ISupplier = new Supplier({ id, ...updateSupplierDto });
            await this.suppliersService.updateSupplier(id, supplier);
            return response.send({ message: 'Fornecedor atualizado com sucesso!' });

        } catch (error: any) {

            return next(error);

        }

    }

    async deleteSupplier(request: Request, response: Response, next: NextFunction) {

        try {

            const { id } = request.params;
            await this.suppliersService.deleteSupplier(id);
            return response.send({ message: 'Fornecedor removido com sucesso!' });

        } catch (error: any) {

            return next(error);

        }

    }

}