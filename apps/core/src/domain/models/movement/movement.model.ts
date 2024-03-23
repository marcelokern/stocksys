import { IProduct } from "../product/product.model";

export enum MovementType {
    IN,
    OUT,
    BALANCE
}

export interface IMovement {
    id: string;
    product: IProduct;
    quantity: number;
    type: MovementType;
    date: Date;
}

export class Movement implements IMovement {

    public readonly id: string;
    public readonly product: IProduct;
    public readonly quantity: number;
    public readonly type: MovementType;
    public readonly date: Date;

    constructor({ id, product, quantity, type, date }: IMovement) {

        this.id = id;
        this.product = product;
        this.quantity = quantity;
        this.type = type;
        this.date = date;

    }

}