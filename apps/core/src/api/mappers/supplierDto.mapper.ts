import { Supplier } from '../../domain/models/supplier.model';
import { CreateSupplierDto, GetSupplierDto, ListSupplierDto } from '../dtos/suppliers.dto';

export class SupplierDtoMapper {

	public static getSupplierDtoMapper(supplier: Supplier): GetSupplierDto {
		
		const dto = new GetSupplierDto();
		dto.id = supplier.id;
		dto.cnpj = supplier.cnpj;
		dto.corporateName = supplier.corporateName;
		dto.phone = supplier.phone;
		dto.email = supplier.email;
		dto.zipcode = supplier.zipcode;
		dto.street = supplier.street;
		dto.neighborhood = supplier.neighborhood;
		dto.addressNumber = supplier.addressNumber;
		dto.addressComplement = supplier.addressComplement;
		dto.city = supplier.city;
		dto.uf = supplier.uf;

		return dto;

	}

	public static listSupplierDtoMapper(supplier: Supplier): ListSupplierDto {
		
		const dto = new ListSupplierDto();
		dto.id = supplier.id;
		dto.cnpj = supplier.cnpj;
		dto.corporateName = supplier.corporateName;
		dto.email = supplier.email;
		
		return dto;

	}

	public static createSupplierDtoMapper(dto: CreateSupplierDto): Supplier {
		
		const supplier = new Supplier();
		supplier.cnpj = dto.cnpj;
		supplier.corporateName = dto.corporateName;
		supplier.phone = dto.phone;
		supplier.email = dto.email;
		supplier.zipcode = dto.zipcode;
		supplier.street = dto.street;
		supplier.neighborhood = dto.neighborhood;
		supplier.addressNumber = dto.addressNumber;
		supplier.addressComplement = dto.addressComplement;
		supplier.city = dto.city;
		supplier.uf = dto.uf;
		
		return supplier;
		
	}

	public static updateSupplierDtoMapper(dto: CreateSupplierDto, id: string): Supplier {
		
		const supplier = new Supplier();
		supplier.id = id;
		supplier.cnpj = dto.cnpj;
		supplier.corporateName = dto.corporateName;
		supplier.phone = dto.phone;
		supplier.email = dto.email;
		supplier.zipcode = dto.zipcode;
		supplier.street = dto.street;
		supplier.neighborhood = dto.neighborhood;
		supplier.addressNumber = dto.addressNumber;
		supplier.addressComplement = dto.addressComplement;
		supplier.city = dto.city;
		supplier.uf = dto.uf;
		
		return supplier;

	}

}
