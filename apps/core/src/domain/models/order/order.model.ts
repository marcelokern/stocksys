import { IProduct } from "../product/product.model";
import { ISupplier } from "../supplier/supplier.model";

export enum OrderStatus {
    PENDING,
    FINISHED,
    CANCELLED
}

export interface IProductOrder {
    product: IProduct,
    quantity: number
}

export interface IOrder {
    id: string;
    supplier: ISupplier;
    status: OrderStatus;
    date: Date;
    products: IProductOrder[];
}

export class Order implements IOrder {

    public readonly id: string;
    public readonly supplier: ISupplier;
    public readonly status: OrderStatus;
    public readonly date: Date;
    public readonly products: IProductOrder[];

    constructor({ id, supplier, status, date, products }: IOrder) {

        this.id = id;
        this.supplier = supplier;
        this.status = status;
        this.date = date;
        this.products = products;

    }

}