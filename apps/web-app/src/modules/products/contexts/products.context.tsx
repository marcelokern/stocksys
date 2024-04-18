import { ContextProviderProps } from "@/modules/global/types/global.types";
import { createContext, useContext, useState } from "react";
import productsService from "../services/products.service";
import { errorHandler } from "@/lib/error-handler";
import { toast } from "@/components/ui/use-toast";
import { CreateProductFormSchemaType, ListProductType, ProductType, ProductsListParametersType, ProductsProviderType, UpdateProductFormSchemaType } from "../types/products.types";

const ProductsProviderContext = createContext<ProductsProviderType>({} as ProductsProviderType)

export function ProductsProvider({ children }: ContextProviderProps) {

    const [productsList, setProductsList] = useState<ListProductType[]>([] as ListProductType[]);
    const [productData, setProductData] = useState<ProductType>({} as ProductType);

    const listProducts = async (parameters?: ProductsListParametersType) => {

        try {

            const response = await productsService.listProducts(parameters);
            setProductsList(response);

        } catch (error: any) {

            errorHandler(error);

        }

    }

    const getProduct = async (id: string) => {

        try {

            const response = await productsService.getProduct(id);
            setProductData(response);

        } catch (error: any) {

            errorHandler(error);

        }

    }

    const createProduct = async (data: CreateProductFormSchemaType) => {

        try {

            const response = await productsService.createProduct(data);
            toast({
                description: response.message,
                variant: 'success'
            })

        } catch (error: any) {

            errorHandler(error);

        }

    }

    const updateProduct = async (id: string, data: UpdateProductFormSchemaType) => {

        try {

            const response = await productsService.updateProduct(id, data);
            toast({
                description: response.message,
                variant: 'success'
            })

        } catch (error: any) {

            errorHandler(error);

        }

    }

    const deleteProduct = async (id: string) => {

        try {

            const response = await productsService.deleteProduct(id);
            toast({
                description: response.message,
                variant: 'success'
            })

        } catch (error: any) {

            errorHandler(error);

        }

    }

    const value = {
        productsList,
        productData,
        listProducts,
        getProduct,
        createProduct,
        updateProduct,
        deleteProduct
    }

    return (
        <ProductsProviderContext.Provider value={value}>
            {children}
        </ProductsProviderContext.Provider>
    )
}

export const useProducts = () => {

    return useContext(ProductsProviderContext);

}