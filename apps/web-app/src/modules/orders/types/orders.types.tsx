import { ViewPropsType } from "@/modules/global/types/global.types";
import { createOrderFormSchema } from "../schemas/orders-form.schema";
import { z } from "zod";

export type ListOrderType = {
    id: string;
    date: string;
    code: string;
    supplierCorporateName: string;
    status: 'PENDING' | 'COMPLETE' | 'CANCEL';
}

export type OrderType = {
    id: string;
    code: number;
    supplierCNPJ: string;
    supplierCorporateName: string;
    date: string;
    status: 'PENDING' | 'COMPLETE' | 'CANCEL';
    orderItems: {
        code: string;
        description: string;
        measureUnit: string;
        quantity: number;
    }[];
}

export type CreateOrderType = {
    supplierId: string,
    orderItems: { productId: string, quantity: number }[]
}

export type UpdateOrderStatusType = {
    status: 'COMPLETE' | 'CANCEL'
}

export type CreateOrderFormSchemaType = z.infer<typeof createOrderFormSchema>;

export type ListOrderResponseType = ListOrderType[];

export type GetOrderResponseType = OrderType;

export type CreateOrderRequestType = CreateOrderType;

export type UpdateOrderStatusRequestType = UpdateOrderStatusType;

export type OrdersProviderType = {
    ordersList: ListOrderType[],
    orderData: OrderType,
    listOrders: (parameters?: OrdersListParametersType) => Promise<void>,
    getOrder: (id: string) => Promise<void>,
    createOrder: (data: CreateOrderType) => Promise<void>,
    updateOrderStatus: (id: string, data: UpdateOrderStatusType) => Promise<void>,
}

type OrdersViewStatePropsType = {}

type OrdersViewHandlersPropsType = {
    handleSelectOrder: (id: string) => void,
    handleSelectStatus: (status: 'COMPLETE' | 'CANCEL') => void,
    handleOpenForm: () => void,
    handleListOrders: (parameters?: OrdersListParametersType) => Promise<void>,
    handleGetOrderData: (id: string) => Promise<void>,
    handleCreateOrder: (data: CreateOrderFormSchemaType) => Promise<void>,
    handleUpdateOrderStatus: () => Promise<void>,
}

export type OrdersViewPropsType = ViewPropsType<OrdersViewStatePropsType, OrdersViewHandlersPropsType>;

export type OrdersListParametersType = {
    supplierId: string,
    onlyPending: boolean
}