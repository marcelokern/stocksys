import { z } from 'zod';

export const listProductsRequestSchema = z.object({
	query: z.object({
		description: z.string().optional(),
		supplierId: z.string().uuid().optional(),
	}).strict(),
});

export const getProductRequestSchema = z.object({
	params: z.object({
		id: z.string().uuid('O id informado é inválido'),
	}),
});

export const createProductRequestSchema = z.object({
	body: z
		.object({
			code: z.string({ required_error: 'O campo código é obrigatório!' }),
			description: z.string({ required_error: 'O campo descrição é obrigatório!' }),
			measureUnit: z.string({ required_error: 'O campo unidade de medida é obrigatório!' }),
			address: z.string({ required_error: 'O campo endereço é obrigatório!' }),
			safetyStock: z.number({
				required_error: 'O campo estoque de segurança é obrigatório!',
				invalid_type_error: 'Estoque de segurança deve ser ser um número',
			}),
			balance: z.number({ required_error: 'O campo balanço é obrigatório!', invalid_type_error: 'Balanço deve ser ser um número' }),
			supplierId: z.string({ required_error: 'O campo id do fornecedor é obrigatório!' }).uuid('O id do fornecedor informado é inválido'),
			repositionTime: z.number({
				required_error: 'O campo tempo de reposição é obrigatório!',
				invalid_type_error: 'O tempo de reposição deve ser um número',
			}),
		})
		.strict(),
});

export const updateProductRequestSchema = z.object({
	params: z.object({
		id: z.string().uuid('O id informado é inválido'),
	}),
	body: z
		.object({
			code: z.string({ required_error: 'O campo código é obrigatório!' }),
			description: z.string({ required_error: 'O campo descrição é obrigatório!' }),
			measureUnit: z.string({ required_error: 'O campo unidade de medida é obrigatório!' }),
			address: z.string({ required_error: 'O campo endereço é obrigatório!' }),
			safetyStock: z.number({
				required_error: 'O campo estoque de segurança é obrigatório!',
				invalid_type_error: 'Estoque de segurança deve ser ser um número',
			}),
			supplierId: z.string({ required_error: 'O campo id do fornecedor é obrigatório!' }).uuid('O id do fornecedor informado é inválido'),
			repositionTime: z.number({
				required_error: 'O campo tempo de reposição é obrigatório!',
				invalid_type_error: 'O tempo de reposição deve ser um número',
			}),
		})
		.strict(),
});

export const deleteProductRequestSchema = z.object({
	params: z.object({
		id: z.string().uuid('O id informado é inválido'),
	}),
});
