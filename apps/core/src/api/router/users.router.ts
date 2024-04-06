import { Router } from 'express';
import { container } from 'tsyringe';
import { IUsersController } from '../controllers/users.controller';
import checkPermissions from '../middlewares/checkPermissions.middleware';
import { UserRole } from '../../domain/models/user.model';
import requestValidator from '../middlewares/requestValidator.middleware';
import { createUserRequestSchema, deleteUserRequestSchema, getUserRequestSchema, updateUserRequestSchema } from '../validationSchemas/users.schema';

const router = Router();

const usersController = container.resolve<IUsersController>('UsersController');

router.get(
    '/users',
    checkPermissions([UserRole.ADMIN, UserRole.MANAGER]),
    usersController.listUsers.bind(usersController)
);

router.get(
    '/users/:id',
    checkPermissions([UserRole.ADMIN, UserRole.MANAGER]),
    requestValidator(getUserRequestSchema),
    usersController.getUser.bind(usersController)
);

router.post(
    '/users',
    checkPermissions([UserRole.ADMIN, UserRole.MANAGER]),
    requestValidator(createUserRequestSchema),
    usersController.createUser.bind(usersController)
);

router.put(
    '/users/:id',
    checkPermissions([UserRole.ADMIN, UserRole.MANAGER]),
    requestValidator(updateUserRequestSchema),
    usersController.updateUser.bind(usersController)
);

router.delete(
    '/users/:id',
    checkPermissions([UserRole.ADMIN, UserRole.MANAGER]),
    requestValidator(deleteUserRequestSchema),
    usersController.deleteUser.bind(usersController)
);

export default router;