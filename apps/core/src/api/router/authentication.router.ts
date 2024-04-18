import { Router } from 'express';
import { container } from 'tsyringe';
import { IUsersController } from '../controllers/users.controller';
import requestValidator from '../middlewares/requestValidator.middleware';
import { authenticateRequestSchema, updateUserPasswordRequestSchema } from '../validationSchemas/authentication.schema';
import checkAuthentication from '../middlewares/checkAuthentication.middleware';

const router = Router();

const usersController = container.resolve<IUsersController>('UsersController');

router.post(
    '/auth',
    requestValidator(authenticateRequestSchema),
    usersController.authenticate.bind(usersController)
);

router.post(
    '/auth/update-password',
    requestValidator(updateUserPasswordRequestSchema),
    usersController.updateUserPassword.bind(usersController)
);

export default router;