import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import ConfirmDialog from "@/modules/global/components/confirm-dialog.component";
import FilterContainer from '@/modules/global/components/filter-container.component';
import MainTitle from '@/modules/global/components/main-title.component';
import MainContainer from '@/modules/global/components/main.component';
import { useGlobal } from "@/modules/global/contexts/global.context";
import { useSuppliers } from "@/modules/suppliers/contexts/suppliers.context";
import { ListSupplierType } from "@/modules/suppliers/types/suppliers.types";
import { CircleFadingPlus, Filter, X } from "lucide-react";
import { useState } from "react";
import CreateOrderForm from "../components/create-order-form.component";
import OrdersTable from '../components/orders-table.component';
import ViewOrderSheet from "../components/view-order-sheet.component";
import { useOrders } from "../contexts/orders.context";
import { OrdersViewPropsType } from '../types/orders.types';

const OrdersView = ({ handlers }: OrdersViewPropsType) => {

    const {
        contentLoader,
        formLoader,
        actionLoader,
        bottomSheetVisible,
        bottomSheetContent,
        openBottomSheet,
        closeBottomSheet
    } = useGlobal();

    const {
        ordersList,
        orderData
    } = useOrders();

    const {
        suppliersList
    } = useSuppliers()

    const {
        handleSelectOrder,
        handleSelectStatus,
        handleOpenForm,
        handleListOrders,
        handleCreateOrder,
        handleGetOrderData,
        handleUpdateOrderStatus,
    } = handlers;

    const [filterSupplierId, setFilterSupplierId] = useState('');
    const [filterOnlyPending, setFilterOnlyPending] = useState<boolean>(false);

    return (

        <MainContainer>

            <CreateOrderForm
                visible={bottomSheetVisible && bottomSheetContent === 'FORM_CREATE'}
                closeBottomSheet={closeBottomSheet}
                actionLoader={actionLoader}
                formAction={handleCreateOrder}
            />

            <ViewOrderSheet
                visible={bottomSheetVisible && (bottomSheetContent === 'FORM_VIEW')}
                closeBottomSheet={closeBottomSheet}
                formData={orderData}
                formLoader={formLoader}
                formAction={(id: string, status: string) => {
                    openBottomSheet('UPDATE_STATUS');
                    handleSelectOrder(id);
                    handleSelectStatus(status as 'COMPLETE' | 'CANCEL')
                }}
            />

            <ConfirmDialog
                visible={bottomSheetVisible && bottomSheetContent === 'UPDATE_STATUS'}
                closeBottomSheet={closeBottomSheet}
                title={'Alterar status do pedido'}
                description={'Tem certeza que deseja alterar o status deste pedido?'}
                actionLoader={actionLoader}
                confirmAction={handleUpdateOrderStatus}
            />

            <MainTitle
                title={['Pedidos']}
                buttons={[
                    <Button onClick={() => handleOpenForm()} className="flex flex-row items-center gap-2">
                        <CircleFadingPlus />Novo Pedido
                    </Button>
                ]}
            />

            <FilterContainer title={'Filtrar pedidos'}>

                <Select onValueChange={(value) => setFilterSupplierId(value)} value={filterSupplierId}>
                    <SelectTrigger>
                        <SelectValue placeholder="Fornecedor" />
                    </SelectTrigger>
                    <SelectContent>
                        {suppliersList.map((x: ListSupplierType) => <SelectItem value={x.id}>{x.corporateName}</SelectItem>)}
                    </SelectContent>
                </Select>

                <div className="flex flex-row items-center">
                    <Switch id="pendingOnly" checked={filterOnlyPending} className="mr-2" onCheckedChange={setFilterOnlyPending} />
                    <label htmlFor="pendingOnly" className="whitespace-nowrap">Somente pendentes</label>
                </div>

                <Button
                    variant={'outline'}
                    className="text-foreground"
                    disabled={!(filterSupplierId || filterOnlyPending)}
                    onClick={() => {
                        handleListOrders({
                            supplierId: filterSupplierId,
                            onlyPending: filterOnlyPending
                        })
                    }}>
                    <Filter className="w-4 mr-2" />Filtrar
                </Button>

                {(filterSupplierId || filterOnlyPending) &&
                    <Button variant={'link'} onClick={() => {
                        setFilterSupplierId('');
                        setFilterOnlyPending(false);
                        handleListOrders();
                    }}>
                        <X className="w-4 mr-2" />Limpar Filtros
                    </Button>
                }

            </FilterContainer>

            <OrdersTable
                data={ordersList}
                contentLoader={contentLoader}
                handleView={(id: string) => {
                    openBottomSheet('FORM_VIEW');
                    handleSelectOrder(id);
                    handleGetOrderData(id);
                }}
                handleUpdateStatus={(id: string, status: string) => {
                    openBottomSheet('UPDATE_STATUS');
                    handleSelectOrder(id);
                    handleSelectStatus(status as 'COMPLETE' | 'CANCEL');
                }}
            />

        </MainContainer>

    );
};

export default OrdersView;