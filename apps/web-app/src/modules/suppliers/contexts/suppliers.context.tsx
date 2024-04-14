import { ContextProviderProps } from "@/modules/global/types/global.types";
import { createContext, useContext, useState } from "react";
import { SupplierData, SupplierListItemType, SuppliersProviderState } from "../types/suppliers.types";

const SuppliersProviderContext = createContext<SuppliersProviderState>({} as SuppliersProviderState)

export function SuppliersProvider({ children }: ContextProviderProps) {

    const [suppliersList, setSuppliersList] = useState<SupplierListItemType[]>([]);
    const [supplierData, setSupplierData] = useState<SupplierData>({} as SupplierData);

    const value = {
        suppliersList,
        supplierData
    }

    return (
        <SuppliersProviderContext.Provider value={value}>
            {children}
        </SuppliersProviderContext.Provider>
    )
}

export const useSuppliers = () => {

    return useContext(SuppliersProviderContext);

}