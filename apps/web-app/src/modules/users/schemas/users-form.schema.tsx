import { z } from 'zod';

export const userFormSchema = z.object({
    registration: z.string().min(1, "Obrigatório"),
    name: z.string().min(1, "Obrigatório"),
    email: z.string().min(1, "Obrigatório").email("E-mail inválido"),
    role: z.string().min(1, "Obrigatório"),
})

export type UserFormSchemaType = z.infer<typeof userFormSchema>