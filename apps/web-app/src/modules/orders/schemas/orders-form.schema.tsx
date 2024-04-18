import { z } from 'zod';

export const createOrderFormSchema = z.object({
    supplierId: z.string().min(1, "Obrigatório"),
    orderItems: z.array(
        z.object({
            productId: z.string().min(1, "Obrigatório"),
            quantity: z.coerce.number().positive("A quantidade deve ser maior que zero")
        })
    )
});