import requester from "@/lib/requester";
import { DefaultResponseType } from "@/modules/global/types/global.types";
import { CreateProductRequestType, GetProductResponseType, ListProductReponseType, ProductsListParametersType, UpdateProductRequestType } from "../types/products.types";

const productsService = {

    listProducts: async (parameters?: ProductsListParametersType) => {

        let url = '/products';

        if (parameters && parameters.description) {
            url += `?description=${parameters.description}`
        }

        if (parameters && parameters.supplierId) {
            url += url === '/products' ? `?supplierId=${parameters.supplierId}` : `&supplierId=${parameters.supplierId}`
        }

        return await requester<undefined, ListProductReponseType>('GET', url);

    },

    getProduct: async (id: string) =>
        await requester<undefined, GetProductResponseType>('GET', `/products/${id}`),

    createProduct: async (data: CreateProductRequestType) =>
        await requester<CreateProductRequestType, DefaultResponseType>('POST', '/products', data),

    updateProduct: async (id: string, data: UpdateProductRequestType) =>
        await requester<UpdateProductRequestType, DefaultResponseType>('PUT', `/products/${id}`, data),

    deleteProduct: async (id: string) =>
        await requester<undefined, DefaultResponseType>('DELETE', `/products/${id}`),

}

export default productsService;