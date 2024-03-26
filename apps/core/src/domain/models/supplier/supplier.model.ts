import { randomUUID } from "crypto";

export interface ISupplier {
	id: string;
	cnpj: string;
	corporateName: string;
	phone?: string | null;
	email: string;
	zipcode?: string | null;
	street?: string | null;
	neighborhood?: string | null;
	addressNumber?: string | null;
	addressComplement?: string | null;
	city?: string | null;
	uf?: string | null;
}

export class Supplier implements ISupplier {

	public readonly id: string;
	public readonly cnpj: string;
	public readonly corporateName: string;
	public readonly phone?: string | null;
	public readonly email: string;
	public readonly zipcode?: string | null;
	public readonly street?: string | null;
	public readonly neighborhood?: string | null;
	public readonly addressNumber?: string | null;
	public readonly addressComplement?: string | null;
	public readonly city?: string | null;
	public readonly uf?: string | null;

	constructor({ id, cnpj, corporateName, phone, email, zipcode, street, neighborhood, addressNumber, addressComplement, city, uf }: ISupplier) {

		this.id = id || randomUUID();
		this.cnpj = cnpj;
		this.corporateName = corporateName;
		this.phone = phone;
		this.email = email;
		this.zipcode = zipcode;
		this.street = street;
		this.neighborhood = neighborhood;
		this.addressNumber = addressNumber;
		this.addressComplement = addressComplement;
		this.city = city;
		this.uf = uf;

	}

}
