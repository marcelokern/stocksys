import { z } from 'zod';

export const supplierFormSchema = z.object({
    cnpj: z.string().min(1, "Obrigatório"),
    corporateName: z.string().min(1, "Obrigatório"),
    email: z.string().email("E-mail inválido"),
    phone: z.string().optional(),
    street: z.string().optional(),
    addressNumber: z.string().optional(),
    addressComplement: z.string().optional(),
    neighborhood: z.string().optional(),
    city: z.string().optional(),
    uf: z.string().optional(),
})

export type SupplierFormSchemaType = z.infer<typeof supplierFormSchema>