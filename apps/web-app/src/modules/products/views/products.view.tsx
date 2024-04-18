import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FilterContainer from '@/modules/global/components/filter-container.component';
import MainTitle from '@/modules/global/components/main-title.component';
import MainContainer from '@/modules/global/components/main.component';
import { CircleFadingPlus, Filter, X } from "lucide-react";
import ProductsTable from '../components/products-table.component';
import { ProductsViewPropsType } from '../types/products.types';
import ConfirmDialog from "@/modules/global/components/confirm-dialog.component";
import { useGlobal } from "@/modules/global/contexts/global.context";
import { useProducts } from "../contexts/products.context";
import ProductsForm from "../components/products-form.component";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSuppliers } from "@/modules/suppliers/contexts/suppliers.context";
import { ListSupplierType } from "@/modules/suppliers/types/suppliers.types";
import ChangePassword from "@/modules/global/components/change-password.component";

const ProductsView = ({ handlers }: ProductsViewPropsType) => {

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
        productsList,
        productData
    } = useProducts();

    const {
        suppliersList,
    } = useSuppliers();

    const {
        handleSelectProduct,
        handleOpenForm,
        handleListProducts,
        handleGetProductData,
        handleCreateProduct,
        handleUpdateProduct,
        handleRemoveProduct,
    } = handlers;

    const [filterDescription, setFilterDescription] = useState('');
    const [filterSupplierId, setFilterSupplierId] = useState('');

    return (

        <MainContainer>

            <ProductsForm
                visible={bottomSheetVisible && (bottomSheetContent === 'FORM_CREATE' || bottomSheetContent === 'FORM_EDIT')}
                closeBottomSheet={closeBottomSheet}
                title={bottomSheetContent === 'FORM_CREATE' ? 'Cadastrar novo produto' : 'Editar produto'}
                formLoader={formLoader}
                formData={productData}
                actionLoader={actionLoader}
                formAction={bottomSheetContent === 'FORM_CREATE' ? handleCreateProduct : handleUpdateProduct}
                type={bottomSheetContent}
            />

            <ConfirmDialog
                visible={bottomSheetVisible && bottomSheetContent === 'CONFIRM_DELETE'}
                closeBottomSheet={closeBottomSheet}
                title={'Remover produto'}
                description={'Deseja realmente remover este fornecedor?'}
                actionLoader={actionLoader}
                confirmAction={handleRemoveProduct}
            />

            <MainTitle
                title={['Produtos']}
                buttons={[
                    <Button onClick={() => handleOpenForm('FORM_CREATE')}
                        className="flex flex-row items-center gap-2">
                        <CircleFadingPlus />Cadastrar Produto
                    </Button>
                ]}
            />

            <FilterContainer title={'Filtrar produtos'}>

                <Input placeholder="Produto" value={filterDescription} onChange={(e) => setFilterDescription(e.target.value)} />

                <Select onValueChange={(value) => setFilterSupplierId(value)} value={filterSupplierId}>
                    <SelectTrigger>
                        <SelectValue placeholder="Fornecedor" />
                    </SelectTrigger>
                    <SelectContent>
                        {suppliersList.map((x: ListSupplierType) => <SelectItem value={x.id}>{x.corporateName}</SelectItem>)}
                    </SelectContent>
                </Select>

                <Button
                    variant={'outline'}
                    className="text-foreground"
                    disabled={!(filterDescription || filterSupplierId)}
                    onClick={() => {
                        handleListProducts({ description: filterDescription, supplierId: filterSupplierId })
                    }}
                >
                    <Filter className="w-4 mr-2" />Filtrar
                </Button>

                {(filterDescription || filterSupplierId) &&
                    <Button
                        variant={'link'}
                        onClick={() => {
                            setFilterDescription('');
                            setFilterSupplierId('');
                            handleListProducts();
                        }}>
                        <X className="w-4 mr-2" />Limpar Filtros
                    </Button>
                }

            </FilterContainer>

            <ProductsTable
                data={productsList}
                contentLoader={contentLoader}
                handleEdit={(id: string) => {
                    handleOpenForm('FORM_EDIT');
                    handleSelectProduct(id);
                    handleGetProductData(id);
                }}
                handleRemove={(id: string) => {
                    openBottomSheet('CONFIRM_DELETE');
                    handleSelectProduct(id)
                }}
            />

        </MainContainer>

    );
};

export default ProductsView;