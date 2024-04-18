import { z } from "zod";

export const authenticateRequestSchema = z.object({
    body: z
        .object({
            login: z.string({ required_error: 'O campo login é obrigatório!' }),
            password: z.string({ required_error: 'O campo senha é obrigatório!' }).min(8, "A senha deve ter no mínimo 8 dígitos.")
        })
        .strict(),
});

export const updateUserPasswordRequestSchema = z.object({
    body: z
        .object({
            currentPassword: z.string({ required_error: 'O campo senha atual é obrigatório!' }),
            newPassword: z.string({ required_error: 'O campo nova senha é obrigatório!' }).min(8, "A senha deve ter no mínimo 8 dígitos.")
        })
        .strict(),
});