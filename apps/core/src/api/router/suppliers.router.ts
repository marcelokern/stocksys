import { Router } from 'express';
import { container } from 'tsyringe';
import { ISuppliersController } from '../controllers/suppliers.controller';
import { createSupplierRequestSchema, deleteSupplierRequestSchema, getSupplierRequestSchema, updateSupplierRequestSchema } from '../validationSchemas/suppliers.schema';
import requestValidator from '../middlewares/requestValidator.middleware';
import checkPermissions from '../middlewares/checkPermissions.middleware';
import { UserRole } from '../../domain/models/user.model';

const router = Router();

const supplierController = container.resolve<ISuppliersController>('SuppliersController');

router.get(
    '/suppliers',
    checkPermissions([UserRole.ADMIN, UserRole.MANAGER]),
    supplierController.listSuppliers.bind(supplierController)
);

router.get(
    '/suppliers/:id',
    checkPermissions([UserRole.ADMIN, UserRole.MANAGER]),
    requestValidator(getSupplierRequestSchema),
    supplierController.getSupplier.bind(supplierController)
);

router.post(
    '/suppliers',
    checkPermissions([UserRole.ADMIN, UserRole.MANAGER]),
    requestValidator(createSupplierRequestSchema),
    supplierController.createSupplier.bind(supplierController)
);

router.put(
    '/suppliers/:id',
    checkPermissions([UserRole.ADMIN, UserRole.MANAGER]),
    requestValidator(updateSupplierRequestSchema),
    supplierController.updateSupplier.bind(supplierController)
);

router.delete(
    '/suppliers/:id',
    checkPermissions([UserRole.ADMIN, UserRole.MANAGER]),
    requestValidator(deleteSupplierRequestSchema),
    supplierController.deleteSupplier.bind(supplierController)
);

export default router;
