import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FilterContainer from '@/modules/global/components/filter-container.component';
import MainTitle from '@/modules/global/components/main-title.component';
import MainContainer from '@/modules/global/components/main.component';
import { CircleFadingPlus, Filter, X } from "lucide-react";
import OrdersTable from '../components/orders-table.component';
import { OrdersViewPropsType } from '../types/orders.types';
import ConfirmDialog from "@/modules/global/components/confirm-dialog.component";
import { useGlobal } from "@/modules/global/contexts/global.context";
import { useOrders } from "../contexts/orders.context";
import OrdersForm from "../components/orders-form.component";
import { useState } from "react";
import { DatePickerWithRange } from "@/components/ui/date-picker";
import { DateRange } from "react-day-picker";
import { Switch } from "@/components/ui/switch";

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
        handleSelectOrder,
        handleListOrders,
        handleSelectStatus,
        handleCreateOrder,
        handleGetOrderData,
        handleUpdateOrderStatus,
    } = handlers;

    const [filterDateRange, setFilterDateRange] = useState<DateRange | undefined>();
    const [filterSupplierInput, setFilterSupplierInput] = useState('');
    const [filterOnlyPending, setFilterOnlyPending] = useState<boolean>(false);

    return (

        <MainContainer>

            <OrdersForm
                visible={bottomSheetVisible && (bottomSheetContent === 'FORM_CREATE' || bottomSheetContent === 'FORM_VIEW')}
                closeBottomSheet={closeBottomSheet}
                title={bottomSheetContent === 'FORM_CREATE' ? 'Novo pedido' : 'Detalhes do pedido'}
                formLoader={formLoader}
                formData={orderData}
                actionLoader={actionLoader}
                formAction={handleCreateOrder}
                content={bottomSheetContent}
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
                    <Button onClick={() => openBottomSheet('FORM_CREATE')} className="flex flex-row items-center gap-2">
                        <CircleFadingPlus />Novo Pedido
                    </Button>
                ]}
            />

            <FilterContainer title={'Filtrar pedidos'}>


                <Input placeholder="Fornecedor" value={filterSupplierInput} onChange={(e) => setFilterSupplierInput(e.target.value)} />

                <DatePickerWithRange dateRange={filterDateRange} setDateRange={setFilterDateRange} />

                <div className="flex flex-row items-center">
                    <Switch id="pendingOnly" checked={filterOnlyPending} className="mr-2" onCheckedChange={setFilterOnlyPending} />
                    <label htmlFor="pendingOnly" className="whitespace-nowrap">Somente pendentes</label>
                </div>

                <Button variant={'outline'} className="text-foreground" disabled={!(filterSupplierInput || filterDateRange || filterOnlyPending)} onClick={() => { handleListOrders({ supplier: filterSupplierInput, dateRange: filterDateRange, onlyPending: filterOnlyPending }) }}>
                    <Filter className="w-4 mr-2" />Filtrar
                </Button>

                {(filterSupplierInput || filterDateRange || filterOnlyPending) &&
                    <Button variant={'link'} onClick={() => { setFilterSupplierInput(''); setFilterDateRange(undefined); setFilterOnlyPending(false); handleListOrders(); }}>
                        <X className="w-4 mr-2" />Limpar Filtros
                    </Button>
                }

            </FilterContainer>

            <OrdersTable
                data={ordersList}
                contentLoader={contentLoader}
                handleView={(id: string) => { openBottomSheet('FORM_VIEW'); handleSelectOrder(id); handleGetOrderData(); }}
                handleUpdateStatus={(id: string, status: string) => { openBottomSheet('UPDATE_STATUS'); handleSelectOrder(id); handleSelectStatus(status) }}
            />

        </MainContainer>

    );
};

export default OrdersView;