import { randomUUID } from 'crypto';

export class Supplier {
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

	constructor() {
		this.id = randomUUID();
	}
}
