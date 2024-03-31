import { z } from 'zod';

export const createOrderItemRequestSchema = z
	.object({
		productId: z.string({ required_error: 'O campo id do produto é obrigatório!' }).uuid('O id do produto informado é inválido'),
		quantity: z.number({ required_error: 'O campo quantidade é obrigatório!', invalid_type_error: 'Quantidade deve ser ser um número' }),
	})
	.strict();

export const createOrderRequestSchema = z.object({
	body: z
		.object({
			supplierId: z.string({ required_error: 'O campo id do fornecedor é obrigatório!' }).uuid('O id do fornecedor informado é inválido'),
			orderItems: z.array(createOrderItemRequestSchema),
		})
		.strict(),
});

export const getOrderRequestSchema = z.object({
	params: z.object({
		id: z.string().uuid('O id informado é inválido'),
	}),
});

export const updateOrderStatusRequestSchema = z.object({
	params: z.object({
		id: z.string().uuid('O id informado é inválido'),
	}),
	body: z
		.object({
			status: z.enum(['CANCEL', 'COMPLETE'], {
				errorMap: (issue) => {
					if (issue.code === 'invalid_enum_value') {
						return { message: 'O status deve ser cancelado (CANCEL) ou finalizado (COMPLETE).' };
					}
					return { message: 'O campo status é obrigatório!' };
				},
			}),
		})
		.strict(),
});
