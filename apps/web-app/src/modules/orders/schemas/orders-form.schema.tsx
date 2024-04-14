import { z } from 'zod';

export const orderFormSchema = z.object({
    supplierId: z.string().min(1, "Obrigatório"),
    products: z.array(
        z.object({
            productId: z.string().min(1, "Obrigatório"),
            quantity: z.number().positive("A quantidade deve ser maior que zero")
        })
    )
})

export type OrderFormSchemaType = z.infer<typeof orderFormSchema>