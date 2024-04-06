import { Router } from 'express';
import { container } from 'tsyringe';
import { IMovementsController } from '../controllers/movements.controller';
import { createMovementRequestSchema } from '../validationSchemas/movements.schema';
import requestValidator from '../middlewares/requestValidator.middleware';
import checkPermissions from '../middlewares/checkPermissions.middleware';
import { UserRole } from '../../domain/models/user.model';

const router = Router();

const movementsController = container.resolve<IMovementsController>('MovementsController');

router.get(
    '/movements/last',
    checkPermissions([UserRole.ADMIN, UserRole.MANAGER, UserRole.OPERATOR]),
    movementsController.listMovements.bind(movementsController)
);

router.post(
    '/movements',
    checkPermissions([UserRole.ADMIN, UserRole.MANAGER, UserRole.OPERATOR]),
    requestValidator(createMovementRequestSchema),
    movementsController.createMovement.bind(movementsController)
);

export default router;
