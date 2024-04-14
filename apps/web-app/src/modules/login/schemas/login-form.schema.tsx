import { z } from 'zod';

export const loginFormSchema = z.object({
    login: z.string().min(1, "Obrigatório"),
    password: z.string().min(1, "Obrigatório"),
})

export type LoginFormSchemaType = z.infer<typeof loginFormSchema>