import { z } from 'zod';

export const createUserFormSchema = z.object({
    registration: z.string().min(1, "Obrigatório"),
    name: z.string().min(1, "Obrigatório"),
    email: z.string().min(1, "Obrigatório").email("E-mail inválido"),
    role: z.string({ required_error: "Obrigatório" }),
});