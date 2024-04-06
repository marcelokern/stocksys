import { inject, injectable } from 'tsyringe';
import { Request, Response, NextFunction } from 'express';
import { IProductsService } from '../../domain/services/products.service';
import { Product } from '../../domain/models/product.model';
import { ProductDtoMapper } from '../mappers/productDto.mapper';
import { CreateProductDto, GetProductDto, ListProductDto, UpdateProductDto } from '../dtos/products.dto';

export interface IProductsController {
	getProduct(request: Request, response: Response, next: NextFunction): Promise<Response | void>;
	listProducts(request: Request, response: Response, next: NextFunction): Promise<Response | void>;
	createProduct(request: Request, response: Response, next: NextFunction): Promise<Response | void>;
	updateProduct(request: Request, response: Response, next: NextFunction): Promise<Response | void>;
	deleteProduct(request: Request, response: Response, next: NextFunction): Promise<Response | void>;
}

@injectable()
export class ProductsController implements IProductsController {
	private readonly productsService: IProductsService;

	constructor(@inject('ProductsService') service: IProductsService) {
		this.productsService = service;
	}

	async getProduct(request: Request, response: Response, next: NextFunction): Promise<Response | void> {

		try {

			const { id } = request.params;
			const product: Product = await this.productsService.getProduct(id);
			const dto: GetProductDto = ProductDtoMapper.getProductDtoMapper(product);
			return response.send(dto);

		} catch (error: any) {

			return next(error);

		}

	}

	async listProducts(request: Request, response: Response, next: NextFunction): Promise<Response | void> {

		try {

			const products: Product[] = await this.productsService.listProducts();
			const listProductsDto: ListProductDto[] = products.map((product) => ProductDtoMapper.listProductDtoMapper(product));
			return response.send(listProductsDto);

		} catch (error: any) {

			return next(error);

		}

	}

	async createProduct(request: Request, response: Response, next: NextFunction): Promise<Response | void> {

		try {

			const userId = request.user.id;
			const dto: CreateProductDto = request.body;
			const product = ProductDtoMapper.createProductDtoMapper(dto);
			await this.productsService.createProduct(product, userId);
			return response.send({ message: 'Produto cadastrado com sucesso!' });

		} catch (error: any) {

			return next(error);

		}

	}

	async updateProduct(request: Request, response: Response, next: NextFunction): Promise<Response | void> {

		try {

			const { id } = request.params;
			const dto: UpdateProductDto = request.body;
			const product = ProductDtoMapper.updateProductDtoMapper(dto, id);
			await this.productsService.updateProduct(id, product);
			return response.send({ message: 'Produto atualizado com sucesso!' });

		} catch (error: any) {

			return next(error);

		}

	}

	async deleteProduct(request: Request, response: Response, next: NextFunction): Promise<Response | void> {

		try {

			const { id } = request.params;
			await this.productsService.deleteProduct(id);
			return response.send({ message: 'Produto removido com sucesso!' });

		} catch (error: any) {

			return next(error);

		}

	}

}
