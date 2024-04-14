import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FilterContainer from '@/modules/global/components/filter-container.component';
import MainTitle from '@/modules/global/components/main-title.component';
import MainContainer from '@/modules/global/components/main.component';
import { CircleFadingPlus, Filter, X } from "lucide-react";
import SuppplierForm from '../components/products-form.component';
import ProductsTable from '../components/products-table.component';
import { ProductsViewPropsType } from '../types/products.types';
import ConfirmDialog from "@/modules/global/components/confirm-dialog.component";
import { useGlobal } from "@/modules/global/contexts/global.context";
import { useProducts } from "../contexts/products.context";
import ProductsForm from "../components/products-form.component";
import { useState } from "react";

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
        handleSelectProduct,
        handleListProducts,
        handleGetProductData,
        handleCreateProduct,
        handleUpdateProduct,
        handleRemoveProduct
    } = handlers;

    const [filterProductInput, setFilterProductInput] = useState('');
    const [filterSupplierInput, setFilterSupplierInput] = useState('');

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
            />

            <ConfirmDialog
                visible={bottomSheetVisible && bottomSheetContent === 'CONFIRM_DELETE'}
                closeBottomSheet={closeBottomSheet}
                title={'Remover produto'}
                description={'bla bla bla'}
                actionLoader={actionLoader}
                confirmAction={handleRemoveProduct}
            />

            <MainTitle
                title={['Produtos']}
                buttons={[
                    <Button onClick={() => openBottomSheet('FORM_CREATE')} className="flex flex-row items-center gap-2">
                        <CircleFadingPlus />Cadastrar Produto
                    </Button>
                ]}
            />

            <FilterContainer title={'Filtrar produtos'}>

                <Input placeholder="Produto" value={filterProductInput} onChange={(e) => setFilterProductInput(e.target.value)} />
                <Input placeholder="Fornecedor" value={filterSupplierInput} onChange={(e) => setFilterSupplierInput(e.target.value)} />

                <Button variant={'outline'} className="text-foreground" disabled={!(filterProductInput || filterSupplierInput)} onClick={() => { handleListProducts({ product: filterProductInput, supplier: filterSupplierInput }) }}>
                    <Filter className="w-4 mr-2" />Filtrar
                </Button>

                {(filterProductInput || filterSupplierInput) &&
                    <Button variant={'link'} onClick={() => { setFilterProductInput(''); setFilterSupplierInput(''); handleListProducts(); }}>
                        <X className="w-4 mr-2" />Limpar Filtros
                    </Button>
                }

            </FilterContainer>

            <ProductsTable
                data={productsList}
                contentLoader={contentLoader}
                handleEdit={(id: string) => { openBottomSheet('FORM_EDIT'); handleSelectProduct(id); handleGetProductData(); }}
                handleRemove={(id: string) => { openBottomSheet('CONFIRM_DELETE'); handleSelectProduct(id) }}
            />

        </MainContainer>

    );
};

export default ProductsView;