import { z } from 'zod';

export const createMovementRequestSchema = z.object({
	body: z
		.object({
			quantity: z.number({ required_error: 'O campo quantidade é obrigatório!', invalid_type_error: 'Quantidade deve ser ser um número' }),
			description: z.string({ required_error: 'O campo descrição é obrigatório!' }),
			type: z.enum(['IN', 'OUT', 'BAL'], {
				errorMap: (issue) => {
					if (issue.code === 'invalid_enum_value') {
						return { message: 'O tipo da movimentação deve ser entrada (IN), saída (OUT) ou balanço (BAL)' };
					}
					return { message: 'O campo tipo da movimentação é obrigatório!' };
				},
			}),
			date: z.string({ required_error: 'O campo data é obrigatório!' }).datetime('A data deve ser no formato 0000-00-00T00:00:00.00Z'),
			productId: z.string({ required_error: 'O campo id do produto é obrigatório!' }).uuid('O id do produto informado é inválido'),
		})
		.strict(),
});
