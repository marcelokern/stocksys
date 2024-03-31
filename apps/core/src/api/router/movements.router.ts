import { Router } from 'express';
import { container } from 'tsyringe';
import { IMovementsController } from '../controllers/movements.controller';
import { createMovementRequestSchema } from '../validationSchemas/movements.schema';
import RequestValidator from '../middlewares/requestValidator.middleware';

const router = Router();

const movementsController = container.resolve<IMovementsController>('MovementsController');

router.get('/movements', movementsController.listMovements.bind(movementsController));
router.post('/movements', RequestValidator(createMovementRequestSchema), movementsController.createMovement.bind(movementsController));

export default router;
