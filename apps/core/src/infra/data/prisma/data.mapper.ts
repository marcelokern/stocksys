import { Prisma, products, suppliers, movementType } from "@prisma/client";
import { Supplier } from "../../../domain/models/supplier.model";
import { Product } from "../../../domain/models/product.model";
import { Movement, MovementType } from "../../../domain/models/movement.model";
import { Order, OrderStatus } from "../../../domain/models/order.model";
import { OrderItem } from "../../../domain/models/orderItem.model";

export class DataMapper {

    public static supplierDataMapper(data: suppliers): Supplier {

        const supplier = new Supplier();

        supplier.id = data.id;
        supplier.cnpj = data.cnpj;
        supplier.corporateName = data.corporateName;
        supplier.phone = data.phone;
        supplier.email = data.email;
        supplier.zipcode = data.zipcode;
        supplier.street = data.street;
        supplier.neighborhood = data.neighborhood;
        supplier.addressNumber = data.addressNumber;
        supplier.addressComplement = data.addressComplement;
        supplier.city = data.city;
        supplier.uf = data.uf;

        return supplier;

    };

    public static productDataMapper(data: Prisma.productsGetPayload<{ include: { supplier: true } }>): Product {

        const product = new Product();

        product.id = data.id;
        product.code = data.code;
        product.description = data.description;
        product.measureUnit = data.measureUnit;
        product.address = data.address;
        product.safetyStock = data.safetyStock;
        product.repositionTime = data.repositionTime;
        product.balance = data.balance;
        product.supplierId = data.supplierId;
        product.supplier = this.supplierDataMapper(data.supplier);

        return product;

    };

    public static movementsDataMapper(data: Prisma.movementsGetPayload<{ include: { product: { include: { supplier: true } } } }>): Movement {

        const movement = new Movement();

        movement.id = data.id;
        movement.description = data.description;
        movement.productId = data.productId;
        movement.product = this.productDataMapper(data.product);
        movement.date = data.date;
        movement.quantity = data.quantity;

        switch (data.type) {
            case "IN": movement.type = MovementType.IN; break;
            case "OUT": movement.type = MovementType.OUT; break;
            case "BAL": movement.type = MovementType.BAL; break;
        }

        return movement;

    };

    public static ordersListDataMapper(data: Prisma.ordersGetPayload<{ include: { supplier: true } }>): Order {

        const order = new Order();

        order.id = data.id;
        order.code = data.code;
        order.date = data.date;
        order.supplierId = data.supplierId;
        order.supplier = this.supplierDataMapper(data.supplier);

        switch (data.status) {
            case "PENDING": order.status = OrderStatus.PENDING; break;
            case "COMPLETE": order.status = OrderStatus.COMPLETE; break;
            case "CANCEL": order.status = OrderStatus.CANCEL; break;
        }

        return order;

    };

    public static ordersGetDataMapper(data: Prisma.ordersGetPayload<{
        include: {
            supplier: true,
            orderItems: {
                include: {
                    product: {
                        select: {
                            code: true,
                            description: true,
                            measureUnit: true
                        }
                    }
                }
            }
        }
    }>): Order {

        const order = new Order();

        order.id = data.id;
        order.code = data.code;
        order.date = data.date;
        order.supplierId = data.supplierId;
        order.supplier = this.supplierDataMapper(data.supplier);

        switch (data.status) {
            case "PENDING": order.status = OrderStatus.PENDING; break;
            case "COMPLETE": order.status = OrderStatus.COMPLETE; break;
            case "CANCEL": order.status = OrderStatus.CANCEL; break;
        }

        order.orderItems = data.orderItems.map(item => {

            const orderItem = new OrderItem();

            orderItem.product = new Product();

            orderItem.quantity = item.quantity;
            orderItem.productId = item.productId;
            orderItem.product.id = item.productId;
            orderItem.product.code = item.product.code;
            orderItem.product.description = item.product.description;
            orderItem.product.measureUnit = item.product.measureUnit;

            return orderItem

        })

        return order;

    };

}