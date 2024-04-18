import { ViewPropsType } from "@/modules/global/types/global.types";
import { createSupplierFormSchema } from "../schemas/suppliers-form.schema";
import { z } from "zod";

export type ListSupplierType = {
    id: string;
    cnpj: string;
    corporateName: string;
    email: string;
}

export type SupplierType = {
    id: string,
    cnpj: string,
    corporateName: string,
    phone: string,
    email: string,
    zipcode: string,
    street: string,
    neighborhood: string,
    addressNumber: string,
    addressComplement: string,
    city: string,
    uf: string,
}

export type CreateSupplierType = {
    cnpj: string,
    corporateName: string,
    email: string,
    phone?: string,
    zipcode?: string,
    street?: string,
    neighborhood?: string,
    addressNumber?: string,
    addressComplement?: string,
    city?: string,
    uf?: string,
}

export type CreateSupplierFormSchemaType = z.infer<typeof createSupplierFormSchema>;

export type ListSupplierResponseType = ListSupplierType[];

export type GetSupplierResponseType = SupplierType;

export type CreateSupplierRequestType = CreateSupplierType;

export type SuppliersProviderType = {
    suppliersList: ListSupplierType[],
    supplierData: SupplierType,
    listSuppliers: (parameters?: SupplierListParametersType) => Promise<void>,
    getSupplier: (id: string) => Promise<void>,
    createSupplier: (data: CreateSupplierType) => Promise<void>,
    updateSupplier: (id: string, data: CreateSupplierType) => Promise<void>,
    deleteSupplier: (id: string) => Promise<void>,
}

type SuppliersViewStatePropsType = {}

type SuppliersViewHandlersPropsType = {
    handleSelectSupplier: (id: string) => void,
    handleListSuppliers: (parameters?: SupplierListParametersType) => Promise<void>,
    handleGetSupplierData: (id: string) => Promise<void>,
    handleCreateSupplier: (data: CreateSupplierFormSchemaType) => Promise<void>,
    handleUpdateSupplier: (data: CreateSupplierFormSchemaType) => Promise<void>,
    handleRemoveSupplier: () => Promise<void>,
}

export type SuppliersViewPropsType = ViewPropsType<SuppliersViewStatePropsType, SuppliersViewHandlersPropsType>;

export type SupplierListParametersType = {
    corporateName: string
}