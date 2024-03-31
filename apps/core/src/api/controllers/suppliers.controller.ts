import { inject, injectable } from 'tsyringe';
import { Request, Response, NextFunction } from 'express';
import { ISuppliersService } from '../../domain/services/suppliers.service';
import { Supplier } from '../../domain/models/supplier.model';
import { SupplierDtoMapper } from '../mappers/supplierDto.mapper';
import { CreateSupplierDto, ListSupplierDto } from '../dtos/suppliers.dto';

export interface ISuppliersController {
	getSupplier(request: Request, response: Response, next: NextFunction): Promise<Response | void>;
	listSuppliers(request: Request, response: Response, next: NextFunction): Promise<Response | void>;
	createSupplier(request: Request, response: Response, next: NextFunction): Promise<Response | void>;
	updateSupplier(request: Request, response: Response, next: NextFunction): Promise<Response | void>;
	deleteSupplier(request: Request, response: Response, next: NextFunction): Promise<Response | void>;
}

@injectable()
export class SuppliersController implements ISuppliersController {
	
	private readonly suppliersService: ISuppliersService;

	constructor(@inject('SuppliersService') service: ISuppliersService) {
		
		this.suppliersService = service;
	
	}

	async getSupplier(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
		
		try {
			
			const { id } = request.params;
			const supplier: Supplier = await this.suppliersService.getSupplier(id);
			const getSupplierDto = SupplierDtoMapper.getSupplierDtoMapper(supplier);
			return response.send(getSupplierDto);
		
		} catch (error: any) {
			
			return next(error);
		
		}
		
	}

	async listSuppliers(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
		
		try {
			
			const suppliers: Supplier[] = await this.suppliersService.listSuppliers();
			const listSuppliersDto: ListSupplierDto[] = suppliers.map(supplier => SupplierDtoMapper.listSupplierDtoMapper(supplier));
			return response.send(listSuppliersDto);
		
		} catch (error: any) {
			
			return next(error);
		
		}
	}

	async createSupplier(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
		
		try {
			
			const dto: CreateSupplierDto = request.body;
			const supplier: Supplier = SupplierDtoMapper.createSupplierDtoMapper(dto);
			await this.suppliersService.createSupplier(supplier);
			return response.send({ message: 'Fornecedor cadastrado com sucesso!' });

		} catch (error: any) {

			return next(error);

		}
	}

	async updateSupplier(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
		
		try {

			const { id } = request.params;
			const dto: CreateSupplierDto = request.body;
			const supplier: Supplier = SupplierDtoMapper.updateSupplierDtoMapper(dto, id);
			await this.suppliersService.updateSupplier(id, supplier);
			return response.send({ message: 'Fornecedor atualizado com sucesso!' });
		
		} catch (error: any) {
			
			return next(error);
		
		}
	}

	async deleteSupplier(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
		
		try {
		
			const { id } = request.params;
			await this.suppliersService.deleteSupplier(id);
			return response.send({ message: 'Fornecedor removido com sucesso!' });
		
		} catch (error: any) {
		
			return next(error);
		
		}
	
	}

}
