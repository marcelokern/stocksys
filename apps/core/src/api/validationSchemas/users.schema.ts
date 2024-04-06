import { z } from 'zod';

export const authenticateRequestSchema = z.object({
    body: z
        .object({
            login: z.string({ required_error: 'O campo login é obrigatório!' }).email('O e-mail informado no login é inválido'),
            password: z.string({ required_error: 'O campo senha é obrigatório!' }).min(8, "A senha informada é inválida.")
        })
        .strict(),
});

export const getUserRequestSchema = z.object({
    params: z.object({
        id: z.string().uuid('O id informado é inválido'),
    }),
});

export const createUserRequestSchema = z.object({
    body: z
        .object({
            registration: z.string({ required_error: 'O campo número de matrícula é obrigatório!' }),
            name: z.string({ required_error: 'O campo nome é obrigatório!' }),
            email: z.string({ required_error: 'O campo número de matrícula é obrigatório!' }).email('O e-mail informado é inválido'),
            role: z.enum(['ADMIN', 'MANAGER', 'OPERATOR'], {
                errorMap: (issue) => {
                    if (issue.code === 'invalid_enum_value') {
                        return { message: 'O tipo do usuário deve ser administrador (ADMIN), gestor (MANAGER) ou operador (OPERATOR)' };
                    }
                    return { message: 'O campo tipo do usuário é obrigatório!' };
                },
            }),
        })
        .strict(),
});

export const updateUserRequestSchema = z.object({
    params: z.object({
        id: z.string().uuid('O id informado é inválido'),
    }),
    body: z
        .object({
            registration: z.string({ required_error: 'O campo número de matrícula é obrigatório!' }),
            name: z.string({ required_error: 'O campo nome é obrigatório!' }),
            email: z.string({ required_error: 'O campo número de matrícula é obrigatório!' }).email('O e-mail informado é inválido'),
            role: z.enum(['ADMIN', 'MANAGER', 'OPERATOR'], {
                errorMap: (issue) => {
                    if (issue.code === 'invalid_enum_value') {
                        return { message: 'O tipo do usuário deve ser administrador (ADMIN), gestor (MANAGER) ou operador (OPERATOR)' };
                    }
                    return { message: 'O campo tipo do usuário é obrigatório!' };
                },
            }),
        })
        .strict(),
});

export const deleteUserRequestSchema = z.object({
    params: z.object({
        id: z.string().uuid('O id informado é inválido'),
    }),
});
