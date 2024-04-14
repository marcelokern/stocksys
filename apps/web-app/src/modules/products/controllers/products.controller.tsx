
import { useToast } from "@/components/ui/use-toast";
import { useGlobal } from "@/modules/global/contexts/global.context";
import { useEffect, useState } from "react";
import { ProductFormSchemaType } from "../schemas/products-form.schema";
import ProductsView from "../views/products.view";

const ProductsController = () => {

    const { toast } = useToast();

    const {
        triggerLoader,
        closeBottomSheet
    } = useGlobal();

    const [selectedProduct, setSelectedProduct] = useState<string>('');

    const handleSelectProduct = (id: string) => {

        setSelectedProduct(id);

    }

    const handleListProducts = (filter?: { product: string, supplier: string }) => {

        triggerLoader('CONTENT', true);
        setTimeout(() => {
            triggerLoader('CONTENT', false);
        }, 3000);

    }

    const handleGetProductData = () => {

        triggerLoader('FORM', true);
        setTimeout(() => {
            triggerLoader('FORM', false);
        }, 3000);

    }

    const handleCreateProduct = (productData: ProductFormSchemaType) => {

        triggerLoader('ACTION', true);
        setTimeout(() => {
            triggerLoader('ACTION', false);
            handleListProducts();
            closeBottomSheet();
            toast({ variant: 'success', description: `Produto cadastrado com sucesso!` });
        }, 3000);

    };

    const handleUpdateProduct = (productData: ProductFormSchemaType) => {

        triggerLoader('ACTION', true);
        setTimeout(() => {
            triggerLoader('ACTION', false);
            handleListProducts();
            closeBottomSheet();
            toast({ variant: 'success', description: `Produto ${selectedProduct} editado com sucesso!` });
        }, 3000);

    };

    const handleRemoveProduct = () => {

        triggerLoader('ACTION', true);
        setTimeout(() => {
            triggerLoader('ACTION', false);
            handleListProducts();
            closeBottomSheet();
            toast({ variant: 'success', description: `Produto ${selectedProduct} removido com sucesso!` });
        }, 3000);

    };

    useEffect(() => {
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
            }}
        />
    );

};

export default ProductsController;