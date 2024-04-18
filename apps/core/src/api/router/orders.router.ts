import { Router } from 'express';
import { container } from 'tsyringe';
import { IOrdersController } from '../controllers/orders.controller';
import { createOrderRequestSchema, getOrderRequestSchema, listOrdersRequestSchema, updateOrderStatusRequestSchema } from '../validationSchemas/orders.schema';
import requestValidator from '../middlewares/requestValidator.middleware';
import checkPermissions from '../middlewares/checkPermissions.middleware';
import { UserRole } from '../../domain/models/user.model';

const router = Router();

const orderController = container.resolve<IOrdersController>('OrdersController');

router.get(
    '/orders',
    checkPermissions([UserRole.ADMIN, UserRole.MANAGER]),
    requestValidator(listOrdersRequestSchema),
    orderController.listOrders.bind(orderController)
);

router.get(
    '/orders/:id',
    checkPermissions([UserRole.ADMIN, UserRole.MANAGER]),
    requestValidator(getOrderRequestSchema),
    orderController.getOrder.bind(orderController)
)
    ;
router.post(
    '/orders',
    checkPermissions([UserRole.ADMIN, UserRole.MANAGER]),
    requestValidator(createOrderRequestSchema),
    orderController.createOrder.bind(orderController)
);

router.patch(
    '/orders/:id',
    checkPermissions([UserRole.ADMIN, UserRole.MANAGER]),
    requestValidator(updateOrderStatusRequestSchema),
    orderController.updateOrderStatus.bind(orderController)
);

export default router;
