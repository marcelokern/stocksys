import { ViewPropsType } from "@/modules/global/types/global.types";
import { SupplierFormSchemaType } from "../schemas/suppliers-form.schema";

export type SupplierListItemType = {
    id: string;
    cnpj: string;
    corporateName: string;
    email: string;
}

export type SupplierData = {
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

export type SuppliersProviderState = {
    suppliersList: SupplierListItemType[],
    supplierData: SupplierData
}

type SuppliersViewStatePropsType = {}

type SuppliersViewHandlersPropsType = {
    handleSelectSupplier: (id: string) => void,
    handleListSuppliers: (filter?: { supplier: string }) => void,
    handleGetSupplierData: () => void,
    handleCreateSupplier: (data: SupplierFormSchemaType) => void,
    handleUpdateSupplier: (data: SupplierFormSchemaType) => void,
    handleRemoveSupplier: () => void,
}

export type SuppliersViewPropsType = ViewPropsType<SuppliersViewStatePropsType, SuppliersViewHandlersPropsType>;