export interface ICreateSupplierDto {
    cnpj: string;
    corporateName: string;
    phone?: string;
    email: string;
    zipcode?: string;
    street?: string;
    neighborhood?: string;
    addressNumber?: string;
    addressComplement?: string;
    city?: string;
    uf?: string;
}

export class CreateSupplierDto implements ICreateSupplierDto {

    public readonly cnpj: string;
    public readonly corporateName: string;
    public readonly phone?: string;
    public readonly email: string;
    public readonly zipcode?: string;
    public readonly street?: string;
    public readonly neighborhood?: string;
    public readonly addressNumber?: string;
    public readonly addressComplement?: string;
    public readonly city?: string;
    public readonly uf?: string;

    constructor({ cnpj, corporateName, phone, email, zipcode, street, neighborhood, addressNumber, addressComplement, city, uf }: ICreateSupplierDto) {

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