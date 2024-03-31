import { Router } from 'express';
import { container } from 'tsyringe';
import { IOrdersController } from '../controllers/orders.controller';
import { createOrderRequestSchema, getOrderRequestSchema, updateOrderStatusRequestSchema } from '../validationSchemas/orders.schema';
import RequestValidator from '../middlewares/requestValidator.middleware';

const router = Router();

const orderController = container.resolve<IOrdersController>('OrdersController');

router.get('/orders', orderController.listOrders.bind(orderController));
router.get('/orders/:id', RequestValidator(getOrderRequestSchema), orderController.getOrder.bind(orderController));
router.post('/orders', RequestValidator(createOrderRequestSchema), orderController.createOrder.bind(orderController));
router.patch('/orders/:id', RequestValidator(updateOrderStatusRequestSchema), orderController.updateOrderStatus.bind(orderController));

export default router;
