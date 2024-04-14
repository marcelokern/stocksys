import { ViewPropsType } from "@/modules/global/types/global.types";
import { OrderFormSchemaType } from "../schemas/orders-form.schema";
import { DateRange } from "react-day-picker";

export type OrderListItemType = {
    id: string;
    date: string;
    code: string;
    supplierCorporateName: string;
    status: string;
}

export type OrderData = {
    id: string;
    code: number;
    supplierCNPJ: string;
    supplierCorporateName: string;
    date: string;
    status: 'PENDING' | 'FINISH' | 'CANCEL';
    orderItems: {
        code: string;
        description: string;
        measureUnit: string;
        quantity: number;
    }[];
}

export type OrdersProviderState = {
    ordersList: OrderListItemType[],
    orderData: OrderData
}

type OrdersViewStatePropsType = {}

type OrdersViewHandlersPropsType = {
    handleSelectOrder: (id: string) => void,
    handleListOrders: (filter?: { supplier: string, dateRange: DateRange | undefined, onlyPending: boolean }) => void,
    handleSelectStatus: (status: string) => void,
    handleGetOrderData: () => void,
    handleCreateOrder: (data: OrderFormSchemaType) => void,
    handleUpdateOrderStatus: () => void,
}

export type OrdersViewPropsType = ViewPropsType<OrdersViewStatePropsType, OrdersViewHandlersPropsType>;