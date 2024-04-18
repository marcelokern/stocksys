import { Product } from '../../domain/models/product.model';
import { CreateProductDto, GetProductDto, ListProductDto, UpdateProductDto } from '../dtos/products.dto';

export class ProductDtoMapper {

	public static getProductDtoMapper(product: Product): GetProductDto {
		
		const dto = new GetProductDto();

		dto.id = product.id;
		dto.code = product.code;
		dto.description = product.description;
		dto.measureUnit = product.measureUnit;
		dto.address = product.address;
		dto.safetyStock = product.safetyStock;
		dto.supplierId = product.supplierId;
		dto.repositionTime = product.repositionTime;
		
		return dto;

	}

	public static listProductDtoMapper(product: Product): ListProductDto {
		
		const dto = new ListProductDto();

		dto.id = product.id;
		dto.code = product.code;
		dto.description = product.description;
		dto.measureUnit = product.measureUnit;
		dto.address = product.address;
		dto.supplierCorporateName = product.supplier.corporateName;
		
		return dto;

	}

	public static createProductDtoMapper(dto: CreateProductDto): Product {
		
		const product = new Product();
		
		product.code = dto.code;
		product.description = dto.description;
		product.measureUnit = dto.measureUnit;
		product.address = dto.address;
		product.safetyStock = dto.safetyStock;
		product.repositionTime = dto.repositionTime;
		product.balance = dto.balance;
		product.supplierId = dto.supplierId;
		
		return product;
		
	}

	public static updateProductDtoMapper(dto: UpdateProductDto, id: string): Product {
		
		const product = new Product();

		product.id = id;
		product.code = dto.code;
		product.description = dto.description;
		product.measureUnit = dto.measureUnit;
		product.address = dto.address;
		product.safetyStock = dto.safetyStock;
		product.repositionTime = dto.repositionTime;
		product.supplierId = dto.supplierId;
		
		return product;

	}

}
