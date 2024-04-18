import { ViewPropsType } from "@/modules/global/types/global.types";
import { createProductFormSchema, updateProductFormSchema } from "../schemas/products-form.schema";
import { z } from "zod";

export type ListProductType = {
    id: string,
    code: string,
    description: string,
    measureUnit: string,
    address: string,
    supplierCorporateName: string,
}

export type ProductType = {
    id: string,
    code: string,
    description: string,
    measureUnit: string,
    address: string,
    safetyStock: number,
    repositionTime: number,
    supplierId: string,
}

export type CreateProductType = {
    code: string;
    description: string;
    measureUnit: string;
    address: string;
    safetyStock: number;
    repositionTime: number;
    balance: number;
    supplierId: string;
}

export type UpdateProductType = {
    code: string;
    description: string;
    measureUnit: string;
    address: string;
    safetyStock: number;
    repositionTime: number;
    supplierId: string;
}

export type CreateProductFormSchemaType = z.infer<typeof createProductFormSchema>;

export type UpdateProductFormSchemaType = z.infer<typeof updateProductFormSchema>;

export type ListProductReponseType = ListProductType[];

export type GetProductResponseType = ProductType;

export type CreateProductRequestType = CreateProductType;

export type UpdateProductRequestType = UpdateProductType;

export type ProductsProviderType = {
    productsList: ListProductType[],
    productData: ProductType,
    listProducts: (parameters?: ProductsListParametersType) => Promise<void>,
    getProduct: (id: string) => Promise<void>,
    createProduct: (data: CreateProductType) => Promise<void>,
    updateProduct: (id: string, data: UpdateProductType) => Promise<void>,
    deleteProduct: (id: string) => Promise<void>,
}

type ProductsViewStatePropsType = {}

type ProductsViewHandlersPropsType = {
    handleSelectProduct: (id: string) => void,
    handleOpenForm: (content: 'FORM_CREATE' | 'FORM_EDIT') => void;
    handleListProducts: (parameters?: ProductsListParametersType) => Promise<void>,
    handleGetProductData: (id: string) => Promise<void>,
    handleCreateProduct: (data: CreateProductFormSchemaType) => Promise<void>,
    handleUpdateProduct: (data: UpdateProductFormSchemaType) => Promise<void>,
    handleRemoveProduct: () => Promise<void>,
}

export type ProductsViewPropsType = ViewPropsType<ProductsViewStatePropsType, ProductsViewHandlersPropsType>;

export type ProductsListParametersType = {
    description: string,
    supplierId: string
}