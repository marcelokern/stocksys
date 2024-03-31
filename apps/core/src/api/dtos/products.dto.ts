export class GetProductDto {
	public id: string;
	public code: string;
	public description: string;
	public measureUnit: string;
	public address: string;
	public securityStock: number;
	public supplierId: string;
	public repositionTime: number;
}

export class ListProductDto {
	public id: string;
	public code: string;
	public description: string;
	public measureUnit: string;
	public address: string;
	public supplierCorporateName: string;
}

export class CreateProductDto {
	public code: string;
	public description: string;
	public measureUnit: string;
	public address: string;
	public securityStock: number;
	public repositionTime: number;
	public balance: number;
	public supplierId: string;
}

export class UpdateProductDto {
	public code: string;
	public description: string;
	public measureUnit: string;
	public address: string;
	public securityStock: number;
	public supplierId: string;
	public repositionTime: number;
}
