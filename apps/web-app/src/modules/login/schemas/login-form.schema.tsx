import { z } from 'zod';

export const loginFormSchema = z.object({
    login: z.string().email("E-mail inválido"),
    password: z.string().min(8, "Senha inválida"),
})

export type LoginFormSchemaType = z.infer<typeof loginFormSchema>