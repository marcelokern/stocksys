import { ISupplier } from "../supplier/supplier.model";

export enum MeasureUnit {
    UN,
    KG,
    LT,
    CX,
}

export interface IProduct {
    id: string;
    code: string;
    description: string;
    measureUnit: MeasureUnit;
    address: string;
    securityStock: number;
    balance: number;
    supplier: ISupplier;
}

export class Product implements IProduct {

    public readonly id: string;
    public readonly code: string;
    public readonly description: string;
    public readonly measureUnit: MeasureUnit;
    public readonly address: string;
    public readonly securityStock: number;
    public readonly balance: number;
    public readonly supplier: ISupplier;

    constructor({ id, code, description, measureUnit, address, securityStock, balance, supplier }: IProduct) {

        this.id = id;
        this.code = code;
        this.description = description;
        this.measureUnit = measureUnit;
        this.address = address;
        this.securityStock = securityStock;
        this.balance = balance;
        this.supplier = supplier;

    }

}