import requester from "@/lib/requester";
import { DefaultResponseType } from "@/modules/global/types/global.types";
import { CreateOrderRequestType, GetOrderResponseType, ListOrderResponseType, OrdersListParametersType, UpdateOrderStatusRequestType } from "../types/orders.types";

const ordersService = {

    listOrders: async (parameters?: OrdersListParametersType) => {

        let url = '/orders';

        if (parameters && parameters.supplierId) {
            url += `?supplierId=${parameters.supplierId}`
        }

        if (parameters && parameters.onlyPending) {
            url += url === '/orders' ? `?onlyPending=${parameters.onlyPending}` : `&onlyPending=${parameters.onlyPending}`
        }

        return await requester<undefined, ListOrderResponseType>('GET', url);

    },

    getOrder: async (id: string) =>
        await requester<undefined, GetOrderResponseType>('GET', `/orders/${id}`),

    createOrder: async (data: CreateOrderRequestType) =>
        await requester<CreateOrderRequestType, DefaultResponseType>('POST', '/orders', data),

    updateOrderStatus: async (id: string, data: UpdateOrderStatusRequestType) =>
        await requester<UpdateOrderStatusRequestType, DefaultResponseType>('PATCH', `/orders/${id}`, data),

}

export default ordersService;