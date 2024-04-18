import { ContextProviderProps } from "@/modules/global/types/global.types";
import { createContext, useContext, useState } from "react";
import suppliersService from "../services/suppliers.service";
import { errorHandler } from "@/lib/error-handler";
import { toast } from "@/components/ui/use-toast";
import { CreateSupplierType, ListSupplierType, SupplierListParametersType, SupplierType, SuppliersProviderType } from "../types/suppliers.types";

const SuppliersProviderContext = createContext<SuppliersProviderType>({} as SuppliersProviderType)

export function SuppliersProvider({ children }: ContextProviderProps) {

    const [suppliersList, setSuppliersList] = useState<ListSupplierType[]>([] as ListSupplierType[]);
    const [supplierData, setSupplierData] = useState<SupplierType>({} as SupplierType);

    const listSuppliers = async (parameters?: SupplierListParametersType) => {

        try {

            const response = await suppliersService.listSuppliers(parameters);

            setSuppliersList(response);

        } catch (error: any) {

            errorHandler(error);

        }

    }

    const getSupplier = async (id: string) => {

        try {

            const response = await suppliersService.getSupplier(id);

            setSupplierData(response);

        } catch (error: any) {

            errorHandler(error);

        }

    }

    const createSupplier = async (data: CreateSupplierType) => {

        try {

            const response = await suppliersService.createSupplier(data);

            toast({
                description: response.message,
                variant: 'success'
            })

        } catch (error: any) {

            errorHandler(error);

        }

    }

    const updateSupplier = async (id: string, data: CreateSupplierType) => {

        try {

            const response = await suppliersService.updateSupplier(id, data);

            toast({
                description: response.message,
                variant: 'success'
            })

        } catch (error: any) {

            errorHandler(error);

        }

    }

    const deleteSupplier = async (id: string) => {

        try {

            const response = await suppliersService.deleteSupplier(id);

            toast({
                description: response.message,
                variant: 'success'
            })

        } catch (error: any) {

            errorHandler(error);

        }

    }

    const value = {
        suppliersList,
        supplierData,
        listSuppliers,
        getSupplier,
        createSupplier,
        updateSupplier,
        deleteSupplier
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