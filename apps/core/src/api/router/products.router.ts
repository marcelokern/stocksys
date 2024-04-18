import { Router } from 'express';
import { container } from 'tsyringe';
import { IProductsController } from '../controllers/products.controller';
import { createProductRequestSchema, deleteProductRequestSchema, getProductRequestSchema, listProductsRequestSchema, updateProductRequestSchema } from '../validationSchemas/products.schema';
import requestValidator from '../middlewares/requestValidator.middleware';
import checkPermissions from '../middlewares/checkPermissions.middleware';
import { UserRole } from '../../domain/models/user.model';

const router = Router();

const productController = container.resolve<IProductsController>('ProductsController');

router.get(
    '/products',
    checkPermissions([UserRole.OPERATOR, UserRole.ADMIN, UserRole.MANAGER]),
    requestValidator(listProductsRequestSchema),
    productController.listProducts.bind(productController)
);

router.get(
    '/products/:id',
    checkPermissions([UserRole.ADMIN, UserRole.MANAGER]),
    requestValidator(getProductRequestSchema),
    productController.getProduct.bind(productController)
);

router.post(
    '/products',
    checkPermissions([UserRole.ADMIN, UserRole.MANAGER]),
    requestValidator(createProductRequestSchema),
    productController.createProduct.bind(productController)
);

router.put(
    '/products/:id',
    checkPermissions([UserRole.ADMIN, UserRole.MANAGER]),
    requestValidator(updateProductRequestSchema),
    productController.updateProduct.bind(productController)
);

router.delete(
    '/products/:id',
    checkPermissions([UserRole.ADMIN, UserRole.MANAGER]),
    requestValidator(deleteProductRequestSchema),
    productController.deleteProduct.bind(productController)
);

export default router;
