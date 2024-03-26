import { container } from "tsyringe";
import { Router } from "express";
import { ISuppliersController } from "../controllers/suppliers.controller";
import { createSupplierRequestSchema, deleteSupplierRequestSchema, getSupplierRequestSchema, updateSupplierRequestSchema } from "../validationSchemas/suppliers/suppliers.schema";
import RequestValidator from "../middlewares/requestValidator.middleware";

const router = Router();

const supplierController = container.resolve<ISuppliersController>('SuppliersController');

router.get("/suppliers", supplierController.listSuppliers.bind(supplierController))
router.get("/suppliers/:id", RequestValidator(getSupplierRequestSchema), supplierController.getSupplier.bind(supplierController))
router.post("/suppliers", RequestValidator(createSupplierRequestSchema), supplierController.createSupplier.bind(supplierController));
router.put("/suppliers/:id", RequestValidator(updateSupplierRequestSchema), supplierController.updateSupplier.bind(supplierController))
router.delete("/suppliers/:id", RequestValidator(deleteSupplierRequestSchema), supplierController.deleteSupplier.bind(supplierController))

export default router;