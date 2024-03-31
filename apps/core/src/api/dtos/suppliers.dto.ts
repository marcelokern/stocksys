export class GetSupplierDto {
	public id: string;
	public cnpj: string;
	public corporateName: string;
	public phone?: string | null;
	public email: string;
	public zipcode?: string | null;
	public street?: string | null;
	public neighborhood?: string | null;
	public addressNumber?: string | null;
	public addressComplement?: string | null;
	public city?: string | null;
	public uf?: string | null;
}

export class ListSupplierDto {
	public id: string;
	public cnpj: string;
	public corporateName: string;
	public email: string;
}

export class CreateSupplierDto {
	public cnpj: string;
	public corporateName: string;
	public phone?: string;
	public email: string;
	public zipcode?: string;
	public street?: string;
	public neighborhood?: string;
	public addressNumber?: string;
	public addressComplement?: string;
	public city?: string;
	public uf?: string;
}
