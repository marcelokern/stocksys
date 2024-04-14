import { z } from 'zod';

export const productFormSchema = z.object({
    code: z.string().min(1, "Obrigatório"),
    description: z.string().min(1, "Obrigatório"),
    measureUnit: z.string().min(1, "Obrigatório"),
    address: z.string().min(1, "Obrigatório"),
    safetyStock: z.string().min(1, "Obrigatório"),
    repositionTime: z.string().min(1, "Obrigatório"),
    balance: z.string().min(1, "Obrigatório"),
    supplierId: z.string().min(1, "Obrigatório"),
})

export type ProductFormSchemaType = z.infer<typeof productFormSchema>