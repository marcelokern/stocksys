import { ContextProviderProps } from "@/modules/global/types/global.types";
import { createContext, useContext, useState } from "react";
import { ProductData, ProductListItemType, ProductsProviderState } from "../types/products.types";

const ProductsProviderContext = createContext<ProductsProviderState>({} as ProductsProviderState)

export function ProductsProvider({ children }: ContextProviderProps) {

    const [productsList, setProductsList] = useState<ProductListItemType[]>([]);
    const [productData, setProductData] = useState<ProductData>({} as ProductData);

    const value = {
        productsList,
        productData
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