import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FilterContainer from '@/modules/global/components/filter-container.component';
import MainTitle from '@/modules/global/components/main-title.component';
import MainContainer from '@/modules/global/components/main.component';
import { CircleFadingPlus, Filter, X } from "lucide-react";
import SuppplierForm from '../components/supplier-form.component';
import SuppliersTable from '../components/suppliers-table.component';
import { SuppliersViewPropsType } from '../types/suppliers.types';
import ConfirmDialog from "@/modules/global/components/confirm-dialog.component";
import { useGlobal } from "@/modules/global/contexts/global.context";
import { useSuppliers } from "../contexts/suppliers.context";
import { useState } from "react";

const SuppliersView = ({ handlers }: SuppliersViewPropsType) => {

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
        suppliersList,
        supplierData
    } = useSuppliers();

    const {
        handleSelectSupplier,
        handleListSuppliers,
        handleGetSupplierData,
        handleCreateSupplier,
        handleUpdateSupplier,
        handleRemoveSupplier
    } = handlers;

    const [filterCorporateName, setFilterCorporateName] = useState('');

    return (

        <MainContainer>

            <SuppplierForm
                visible={bottomSheetVisible && (bottomSheetContent === 'FORM_CREATE' || bottomSheetContent === 'FORM_EDIT')}
                closeBottomSheet={closeBottomSheet}
                title={bottomSheetContent === 'FORM_CREATE' ? 'Cadastrar novo fornecedor' : 'Editar fornecedor'}
                formLoader={formLoader}
                formData={supplierData}
                actionLoader={actionLoader}
                formAction={bottomSheetContent === 'FORM_CREATE' ? handleCreateSupplier : handleUpdateSupplier}
            />

            <ConfirmDialog
                visible={bottomSheetVisible && bottomSheetContent === 'CONFIRM_DELETE'}
                closeBottomSheet={closeBottomSheet}
                title={'Remover fornecedor'}
                description={'Deseja realmente remover este fornecedor?'}
                actionLoader={actionLoader}
                confirmAction={handleRemoveSupplier}
            />

            <MainTitle
                title={['Fornecedores']}
                buttons={[
                    <Button onClick={() => openBottomSheet('FORM_CREATE')} className="flex flex-row items-center gap-2">
                        <CircleFadingPlus />Cadastrar Fornecedor
                    </Button>
                ]}
            />

            <FilterContainer title={'Filtrar fornecedores'}>

                <Input placeholder="Fornecedor" value={filterCorporateName} onChange={(e) => setFilterCorporateName(e.target.value)} />

                <Button
                    variant={'outline'} className="text-foreground"
                    disabled={!filterCorporateName}
                    onClick={() => { handleListSuppliers({ corporateName: filterCorporateName }) }}
                >
                    <Filter className="w-4 mr-2" />Filtrar
                </Button>

                {filterCorporateName &&
                    <Button
                        variant={'link'}
                        onClick={() => {
                            setFilterCorporateName('');
                            handleListSuppliers();
                        }}
                    >
                        <X className="w-4 mr-2" />Limpar Filtros
                    </Button>
                }

            </FilterContainer>

            <SuppliersTable
                data={suppliersList}
                contentLoader={contentLoader}
                handleEdit={(id: string) => {
                    openBottomSheet('FORM_EDIT');
                    handleSelectSupplier(id);
                    handleGetSupplierData(id);
                }}
                handleRemove={(id: string) => {
                    openBottomSheet('CONFIRM_DELETE');
                    handleSelectSupplier(id)
                }}
            />

        </MainContainer>

    );
};

export default SuppliersView;