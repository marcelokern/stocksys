import { Router } from 'express';
import { container } from 'tsyringe';
import { IProductsController } from '../controllers/products.controller';
import { createProductRequestSchema, deleteProductRequestSchema, getProductRequestSchema, updateProductRequestSchema} from '../validationSchemas/products.schema';
import RequestValidator from '../middlewares/requestValidator.middleware';

const router = Router();

const productController = container.resolve<IProductsController>('ProductsController');

router.get('/products', productController.listProducts.bind(productController));
router.get('/products/:id', RequestValidator(getProductRequestSchema), productController.getProduct.bind(productController));
router.post('/products', RequestValidator(createProductRequestSchema), productController.createProduct.bind(productController));
router.put('/products/:id', RequestValidator(updateProductRequestSchema), productController.updateProduct.bind(productController));
router.delete('/products/:id', RequestValidator(deleteProductRequestSchema), productController.deleteProduct.bind(productController));

export default router;
