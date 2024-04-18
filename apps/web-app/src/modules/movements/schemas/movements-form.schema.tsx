import { z } from 'zod';

export const createMovementFormSchema = z.object({
    productId: z.string().min(1),
    description: z.string().min(1),
    quantity: z.coerce.number().positive(),
    type: z.string().min(1),
});