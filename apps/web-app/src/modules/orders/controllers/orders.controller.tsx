
import { useToast } from "@/components/ui/use-toast";
import { useGlobal } from "@/modules/global/contexts/global.context";
import { useEffect, useState } from "react";
import { OrderFormSchemaType } from "../schemas/orders-form.schema";
import OrdersView from "../views/orders.view";
import { DateRange } from "react-day-picker";

const OrdersController = () => {

    const { toast } = useToast();

    const {
        triggerLoader,
        closeBottomSheet
    } = useGlobal();

    const [selectedOrder, setSelectedOrder] = useState<string>('');
    const [selectedStatus, setSelectedStatus] = useState<string>('');

    const handleSelectOrder = (id: string) => {

        setSelectedOrder(id);

    }

    const handleSelectStatus = (status: string) => {

        setSelectedStatus(status);

    }

    const handleListOrders = (filter?: { supplier: string, dateRange: DateRange | undefined, onlyPending: boolean }) => {

        triggerLoader('CONTENT', true);
        setTimeout(() => {
            triggerLoader('CONTENT', false);
        }, 3000);

    }

    const handleGetOrderData = () => {

        triggerLoader('FORM', true);
        setTimeout(() => {
            triggerLoader('FORM', false);
        }, 3000);

    }

    const handleCreateOrder = (orderData: OrderFormSchemaType) => {

        triggerLoader('ACTION', true);
        setTimeout(() => {
            triggerLoader('ACTION', false);
            handleListOrders();
            closeBottomSheet();
            toast({ variant: 'success', description: `Produto cadastrado com sucesso!` });
        }, 3000);

    };

    const handleUpdateOrderStatus = () => {

        triggerLoader('ACTION', true);
        setTimeout(() => {
            triggerLoader('ACTION', false);
            handleListOrders();
            closeBottomSheet();
            toast({ variant: 'success', description: `Produto ${selectedOrder} editado com sucesso!` });
        }, 3000);

    };

    useEffect(() => {
        handleListOrders();
    }, []);

    return (
        <OrdersView
            state={{}}
            handlers={{
                handleSelectOrder,
                handleListOrders,
                handleSelectStatus,
                handleGetOrderData,
                handleCreateOrder,
                handleUpdateOrderStatus,
            }}
        />
    );

};

export default OrdersController;