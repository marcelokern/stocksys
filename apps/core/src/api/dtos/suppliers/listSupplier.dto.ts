export interface IListSupplierDto {
    id: string;
    cnpj: string;
    corporateName: string;
    email: string;
}

export class ListSupplierDto implements IListSupplierDto {

    public readonly id: string;
    public readonly cnpj: string;
    public readonly corporateName: string;
    public readonly email: string;

    constructor({ id, cnpj, corporateName, email }: IListSupplierDto) {

        this.id = id;
        this.cnpj = cnpj;
        this.corporateName = corporateName;
        this.email = email;

    }

}