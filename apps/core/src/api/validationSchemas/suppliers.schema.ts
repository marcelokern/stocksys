import { z } from 'zod';

export const listSuppliersRequestSchema = z.object({
	query: z.object({
		corporateName: z.string().optional(),
	}).strict(),
});

export const getSupplierRequestSchema = z.object({
	params: z.object({
		id: z.string().uuid('O id informado é inválido'),
	}),
});

export const createSupplierRequestSchema = z.object({
	body: z
		.object({
			cnpj: z.string({ required_error: 'O campo CNPJ é obrigatório!' }).length(14, 'O CNPJ informado é inválido'),
			corporateName: z.string({ required_error: 'O campo razão social é obrigatório' }),
			email: z.string({ required_error: 'O campo e-mail é obrigatório!' }).email('O e-mail informado é inválido'),
			phone: z.string().optional(),
			zipcode: z.string().optional(),
			street: z.string().optional(),
			neighborhood: z.string().optional(),
			addressNumber: z.string().optional(),
			addressComplement: z.string().optional(),
			city: z.string().optional(),
			uf: z.string().optional(),
		})
		.strict(),
});

export const updateSupplierRequestSchema = z.object({
	params: z.object({
		id: z.string().uuid('O id informado é inválido'),
	}),
	body: z
		.object({
			cnpj: z.string({ required_error: 'O campo CNPJ é obrigatório!' }).length(14, 'O CNPJ informado é inválido'),
			corporateName: z.string({ required_error: 'O campo razão social é obrigatório' }),
			email: z.string({ required_error: 'O campo e-mail é obrigatório!' }).email('O e-mail informado é inválido'),
			phone: z.string().optional(),
			zipcode: z.string().optional(),
			street: z.string().optional(),
			neighborhood: z.string().optional(),
			addressNumber: z.string().optional(),
			addressComplement: z.string().optional(),
			city: z.string().optional(),
			uf: z.string().optional(),
		})
		.strict(),
});

export const deleteSupplierRequestSchema = z.object({
	params: z.object({
		id: z.string().uuid('O id informado é inválido'),
	}),
});
