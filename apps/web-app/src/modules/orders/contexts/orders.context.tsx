import { ContextProviderProps } from "@/modules/global/types/global.types";
import { createContext, useContext, useState } from "react";
import { errorHandler } from "@/lib/error-handler";
import ordersService from "../services/orders.service";
import { toast } from "@/components/ui/use-toast";
import { CreateOrderType, ListOrderType, OrderType, OrdersListParametersType, OrdersProviderType, UpdateOrderStatusType } from "../types/orders.types";

const OrdersProviderContext = createContext<OrdersProviderType>({} as OrdersProviderType)

export function OrdersProvider({ children }: ContextProviderProps) {

    const [ordersList, setOrdersList] = useState<ListOrderType[]>([] as ListOrderType[]);
    const [orderData, setOrderData] = useState<OrderType>({} as OrderType);

    const listOrders = async (parameters?: OrdersListParametersType) => {

        try {

            const response = await ordersService.listOrders(parameters);
            setOrdersList(response);

        } catch (error: any) {

            errorHandler(error);

        }

    }

    const getOrder = async (id: string) => {

        try {

            const response = await ordersService.getOrder(id);
            setOrderData(response);

        } catch (error: any) {

            errorHandler(error);

        }

    }

    const createOrder = async (data: CreateOrderType) => {

        try {

            const response = await ordersService.createOrder(data);
            toast({
                description: response.message,
                variant: 'success'
            })

        } catch (error: any) {

            errorHandler(error);

        }

    }

    const updateOrderStatus = async (id: string, data: UpdateOrderStatusType) => {

        try {

            const response = await ordersService.updateOrderStatus(id, data);
            toast({
                description: response.message,
                variant: 'success'
            })

        } catch (error: any) {

            errorHandler(error);

        }

    }

    const value = {
        ordersList,
        orderData,
        listOrders,
        getOrder,
        createOrder,
        updateOrderStatus,
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