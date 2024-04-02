import { z } from 'zod';

export const historyReportSchema = z.object({
    body: z
        .object({
            startDate: z.string({ required_error: 'O campo data inicial é obrigatório!' }).datetime('A data inicial deve ser no formato 0000-00-00T00:00:00.00Z'),
            endDate: z.string({ required_error: 'O campo data final é obrigatório!' }).datetime('A data final deve ser no formato 0000-00-00T00:00:00.00Z'),
            products: z.string({ required_error: 'O campo produtos é obrigatório.' }).uuid('O campo produtos deve conter uma lista de id`s ou vazio para selecionar todos os produtos').array(),
        })
        .strict()
        .refine((data) => data.endDate > data.startDate, {
            message: "A data inicial não pode ser maior que a data final",
        })
});

export const currentPositionReportSchema = z.object({
    body: z
        .object({
            products: z.string({ required_error: 'O campo produtos é obrigatório.' }).uuid('O campo produtos deve conter uma lista de id`s ou vazio para selecionar todos os produtos').array(),
            onlyCriticalItems: z.boolean({ required_error: 'O campo apenas produtos críticos é obrigatório', invalid_type_error: 'O campo apenas produtos críticos deve ser do tipo boleano' }),
        })
        .strict()
});

export const projectionReportSchema = z.object({
    body: z
        .object({
            startDate: z.string({ required_error: 'O campo data inicial é obrigatório!' }).datetime('A data inicial deve ser no formato 0000-00-00T00:00:00.00Z'),
            endDate: z.string({ required_error: 'O campo data final é obrigatório!' }).datetime('A data final deve ser no formato 0000-00-00T00:00:00.00Z'),
            onlyCriticalItems: z.boolean({ required_error: 'O campo apenas produtos críticos é obrigatório', invalid_type_error: 'O campo apenas produtos críticos deve ser do tipo boleano' }),
            products: z.string({ required_error: 'O campo produtos é obrigatório.' }).uuid('O campo produtos deve conter uma lista de id`s ou vazio para selecionar todos os produtos').array(),
        })
        .strict()
        .refine((data) => data.endDate > data.startDate, {
            message: "A data inicial não pode ser maior que a data final",
        })
});