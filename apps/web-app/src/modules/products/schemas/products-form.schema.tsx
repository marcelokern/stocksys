import { z } from 'zod';

export const createProductFormSchema = z.object({
    code: z.string().min(1, "Obrigatório"),
    description: z.string().min(1, "Obrigatório"),
    measureUnit: z.string().min(1, "Obrigatório"),
    address: z.string().min(1, "Obrigatório"),
    safetyStock: z.coerce.number().positive("Obrigatório"),
    repositionTime: z.coerce.number().positive("Obrigatório"),
    balance: z.coerce.number().positive("Obrigatório"),
    supplierId: z.string({ required_error: 'Obrigatório' })
})

export const updateProductFormSchema = z.object({
    code: z.string().min(1, "Obrigatório"),
    description: z.string().min(1, "Obrigatório"),
    measureUnit: z.string().min(1, "Obrigatório"),
    address: z.string().min(1, "Obrigatório"),
    safetyStock: z.coerce.number().positive("Obrigatório"),
    repositionTime: z.coerce.number().positive("Obrigatório"),
    supplierId: z.string({ required_error: 'Obrigatório' })
})