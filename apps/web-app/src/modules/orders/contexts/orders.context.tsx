import { ContextProviderProps } from "@/modules/global/types/global.types";
import { createContext, useContext, useState } from "react";
import { OrderData, OrderListItemType, OrdersProviderState } from "../types/orders.types";

const OrdersProviderContext = createContext<OrdersProviderState>({} as OrdersProviderState)

export function OrdersProvider({ children }: ContextProviderProps) {

    const [ordersList, setOrdersList] = useState<OrderListItemType[]>([]);
    const [orderData, setOrderData] = useState<OrderData>({} as OrderData);

    const value = {
        ordersList,
        orderData
    }

    return (
        <OrdersProviderContext.Provider value={value}>
            {children}
        </OrdersProviderContext.Provider>
    )
}

export const useOrders = () => {

    return useContext(OrdersProviderContext);

}