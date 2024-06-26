import { z } from 'zod';

export const updatePasswordFormSchema = z.object({
    currentPassword: z.string().min(1, "Obrigatório"),
    newPassword: z.string().min(8, "A senha deve ter no mínimo 8 dígitos"),
    confirmPassword: z.string().min(8, "A senha deve ter no mínimo 8 dígitos"),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "As senhas não conferem",
    path: ["confirmPassword"]
});

export type UpdatePasswordFormSchema = z.infer<typeof updatePasswordFormSchema>