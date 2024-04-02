import { Router } from 'express';
import { container } from 'tsyringe';
import { IReportsController } from '../controllers/reports.controller';
import { currentPositionReportSchema, historyReportSchema, projectionReportSchema } from '../validationSchemas/reports.schema';
import RequestValidator from '../middlewares/requestValidator.middleware';

const router = Router();

const reportController = container.resolve<IReportsController>('ReportsController');

router.post('/reports/history', RequestValidator(historyReportSchema), reportController.generateHistoryReport.bind(reportController));
router.post('/reports/current-position', RequestValidator(currentPositionReportSchema), reportController.generateCurrentPositionReport.bind(reportController));
router.post('/reports/projection', RequestValidator(projectionReportSchema), reportController.generateProjectionReport.bind(reportController));

export default router;