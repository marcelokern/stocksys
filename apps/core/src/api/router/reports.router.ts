import { Router } from 'express';
import { container } from 'tsyringe';
import { IReportsController } from '../controllers/reports.controller';
import { currentPositionReportSchema, historyReportSchema, projectionReportSchema } from '../validationSchemas/reports.schema';
import requestValidator from '../middlewares/requestValidator.middleware';
import checkPermissions from '../middlewares/checkPermissions.middleware';
import { UserRole } from '../../domain/models/user.model';

const router = Router();

const reportController = container.resolve<IReportsController>('ReportsController');

router.post(
    '/reports/history',
    checkPermissions([UserRole.ADMIN, UserRole.MANAGER]),
    requestValidator(historyReportSchema), reportController.generateHistoryReport.bind(reportController)
);

router.post(
    '/reports/current-position',
    checkPermissions([UserRole.ADMIN, UserRole.MANAGER]),
    requestValidator(currentPositionReportSchema),
    reportController.generateCurrentPositionReport.bind(reportController)
);

router.post(
    '/reports/projection',
    checkPermissions([UserRole.ADMIN, UserRole.MANAGER]),
    requestValidator(projectionReportSchema),
    reportController.generateProjectionReport.bind(reportController)
);

export default router;