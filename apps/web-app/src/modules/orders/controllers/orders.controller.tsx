import { useGlobal } from "@/modules/global/contexts/global.context";
import { useEffect, useState } from "react";
import OrdersView from "../views/orders.view";
import { useOrders } from "../contexts/orders.context";
import { CreateOrderFormSchemaType, OrdersListParametersType } from "../types/orders.types";
import { useSuppliers } from "@/modules/suppliers/contexts/suppliers.context";
import { useProducts } from "@/modules/products/contexts/products.context";

const OrdersController = () => {

    const {
        triggerLoader,
        openBottomSheet,
        closeBottomSheet
    } = useGlobal();

    const {
        listOrders,
        getOrder,
        createOrder,
        updateOrderStatus
    } = useOrders();

    const { listSuppliers } = useSuppliers();

    const [selectedOrder, setSelectedOrder] = useState<string>('');
    const [selectedStatus, setSelectedStatus] = useState<'COMPLETE' | 'CANCEL'>();

    const handleSelectOrder = (id: string) => {

        setSelectedOrder(id);

    }

    const handleSelectStatus = (status: 'COMPLETE' | 'CANCEL') => {

        setSelectedStatus(status);

    }

    const handleOpenForm = () => {

        listSuppliers();
        openBottomSheet('FORM_CREATE');

    }

    const handleListOrders = async (parameters?: OrdersListParametersType) => {

        triggerLoader('CONTENT', true);
        await listOrders(parameters);
        triggerLoader('CONTENT', false);

    }

    const handleGetOrderData = async (id: string) => {

        triggerLoader('FORM', true);
        await getOrder(id);
        triggerLoader('FORM', false);

    }

    const handleCreateOrder = async (orderData: CreateOrderFormSchemaType) => {

        triggerLoader('ACTION', true);
        await createOrder(orderData);
        triggerLoader('ACTION', false);
        handleListOrders();
        closeBottomSheet();

    };

    const handleUpdateOrderStatus = async () => {

        triggerLoader('ACTION', true);
        await updateOrderStatus(selectedOrder, { status: selectedStatus as 'COMPLETE' | 'CANCEL' });
        triggerLoader('ACTION', false);
        handleListOrders();
        closeBottomSheet();

    };

    useEffect(() => {
        listSuppliers();
        handleListOrders();
    }, []);

    return (
        <OrdersView
            state={{}}
            handlers={{
                handleSelectOrder,
                handleSelectStatus,
                handleOpenForm,
                handleListOrders,
                handleGetOrderData,
                handleCreateOrder,
                handleUpdateOrderStatus,
            }}
        />
    );

};

export default OrdersController;