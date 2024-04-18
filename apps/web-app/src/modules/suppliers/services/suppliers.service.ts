import requester from "@/lib/requester";
import { CreateSupplierRequestType, GetSupplierResponseType, ListSupplierResponseType, SupplierListParametersType } from "../types/suppliers.types";
import { DefaultResponseType } from "@/modules/global/types/global.types";

const suppliersService = {

    listSuppliers: async (parameters?: SupplierListParametersType) => {

        let url = '/suppliers';

        if (parameters && parameters.corporateName) {
            url += `?corporateName=${parameters.corporateName}`
        }

        return await requester<undefined, ListSupplierResponseType>('GET', url);

    },

    getSupplier: async (id: string) =>
        await requester<undefined, GetSupplierResponseType>('GET', `/suppliers/${id}`),

    createSupplier: async (data: CreateSupplierRequestType) =>
        await requester<CreateSupplierRequestType, DefaultResponseType>('POST', '/suppliers', data),

    updateSupplier: async (id: string, data: CreateSupplierRequestType) =>
        await requester<CreateSupplierRequestType, DefaultResponseType>('PUT', `/suppliers/${id}`, data),

    deleteSupplier: async (id: string) =>
        await requester<undefined, DefaultResponseType>('DELETE', `/suppliers/${id}`),

}

export default suppliersService;