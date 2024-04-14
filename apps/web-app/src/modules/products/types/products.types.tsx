import { ViewPropsType } from "@/modules/global/types/global.types";
import { ProductFormSchemaType } from "../schemas/products-form.schema";

export type ProductListItemType = {
    id: string,
    code: string,
    description: string,
    measureUnit: string,
    address: string,
    supplierCorporateName: string,
}

export type ProductData = {
    id: string,
    code: string,
    description: string,
    measureUnit: string,
    address: string,
    safetyStock: string,
    supplierId: string,
    repositionTime: string,
}

export type ProductsProviderState = {
    productsList: ProductListItemType[],
    productData: ProductData
}

type ProductsViewStatePropsType = {}

type ProductsViewHandlersPropsType = {
    handleSelectProduct: (id: string) => void,
    handleListProducts: (filter?: { product: string, supplier: string }) => void,
    handleGetProductData: () => void,
    handleCreateProduct: (data: ProductFormSchemaType) => void,
    handleUpdateProduct: (data: ProductFormSchemaType) => void,
    handleRemoveProduct: () => void,
}

export type ProductsViewPropsType = ViewPropsType<ProductsViewStatePropsType, ProductsViewHandlersPropsType>;