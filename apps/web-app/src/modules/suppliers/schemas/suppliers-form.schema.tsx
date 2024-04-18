import { z } from 'zod';

export const createSupplierFormSchema = z.object({
    cnpj: z.string().min(1, "Obrigatório").length(14, 'O CNPJ informado é inválido'),
    corporateName: z.string().min(1, "Obrigatório"),
    email: z.string().email("E-mail inválido"),
    phone: z.string().optional(),
    zipcode: z.string().optional(),
    street: z.string().optional(),
    addressNumber: z.string().optional(),
    addressComplement: z.string().optional(),
    neighborhood: z.string().optional(),
    city: z.string().optional(),
    uf: z.string().optional(),
});