import { useGlobal } from "@/modules/global/contexts/global.context";
import { useEffect, useState } from "react";
import ProductsView from "../views/products.view";
import { useProducts } from "../contexts/products.context";
import { CreateProductFormSchemaType, ProductsListParametersType, UpdateProductFormSchemaType } from "../types/products.types";
import { useSuppliers } from "@/modules/suppliers/contexts/suppliers.context";

const ProductsController = () => {

    const {
        triggerLoader,
        openBottomSheet,
        closeBottomSheet,
    } = useGlobal();

    const {
        listProducts,
        getProduct,
        createProduct,
        updateProduct,
        deleteProduct
    } = useProducts();

    const {
        listSuppliers
    } = useSuppliers()

    const [selectedProduct, setSelectedProduct] = useState<string>('');

    const handleSelectProduct = (id: string) => {

        setSelectedProduct(id);

    }

    const handleOpenForm = (content: 'FORM_CREATE' | 'FORM_EDIT') => {

        listSuppliers();
        openBottomSheet(content);

    }

    const handleListProducts = async (parameters?: ProductsListParametersType) => {

        triggerLoader('CONTENT', true);
        await listProducts(parameters);
        triggerLoader('CONTENT', false);

    }

    const handleGetProductData = async (id: string) => {

        triggerLoader('FORM', true);
        await getProduct(id);
        triggerLoader('FORM', false);

    }

    const handleCreateProduct = async (productData: CreateProductFormSchemaType) => {

        triggerLoader('ACTION', true);
        await createProduct(productData)
        triggerLoader('ACTION', false);
        handleListProducts();
        closeBottomSheet();

    };

    const handleUpdateProduct = async (productData: UpdateProductFormSchemaType) => {

        triggerLoader('ACTION', true);
        await updateProduct(selectedProduct, productData);
        triggerLoader('ACTION', false);
        handleListProducts();
        closeBottomSheet();

    };

    const handleRemoveProduct = async () => {

        triggerLoader('ACTION', true);
        await deleteProduct(selectedProduct);
        triggerLoader('ACTION', false);
        handleListProducts();
        closeBottomSheet();

    };

    useEffect(() => {
        listSuppliers();
        handleListProducts();
    }, []);

    return (
        <ProductsView
            state={{}}
            handlers={{
                handleSelectProduct,
                handleListProducts,
                handleGetProductData,
                handleCreateProduct,
                handleUpdateProduct,
                handleRemoveProduct,
                handleOpenForm
            }}
        />
    );

};

export default ProductsController;