import { inject, injectable } from 'tsyringe';
import { Request, Response, NextFunction } from 'express';
import { IReportsService } from '../../domain/services/reports.service';
import { CurrentPositionReport, HistoryReport, ProjectionReport, Report } from '../../domain/models/report.model';
import { HistoryReportDto, CurrentPositionReportDto, ReportDto, ProjectionReportDto } from '../dtos/reports.dto';
import { ReportDtoMapper } from '../mappers/reportDto.mapper';

export interface IReportsController {
    generateHistoryReport(request: Request, response: Response, next: NextFunction): Promise<Response | void>;
    generateCurrentPositionReport(request: Request, response: Response, next: NextFunction): Promise<Response | void>;
    generateProjectionReport(request: Request, response: Response, next: NextFunction): Promise<Response | void>;
}

@injectable()
export class ReportsController implements IReportsController {

    private readonly reportsService: IReportsService;

    constructor(@inject('ReportsService') service: IReportsService) {
        this.reportsService = service;
    };

    async generateHistoryReport(request: Request, response: Response, next: NextFunction): Promise<Response | void> {

        try {

            const { startDate, endDate, products } = request.body;

            const report: Report<HistoryReport> = await this.reportsService.generateHistoryReport(startDate, endDate, products);
            const dto: ReportDto<HistoryReportDto> = ReportDtoMapper.historyReportDtoMapper(report);

            return response.send(dto);

        } catch (error: any) {

            return next(error);

        }

    };

    async generateCurrentPositionReport(request: Request, response: Response, next: NextFunction): Promise<Response | void> {

        try {

            const { onlyCriticalItems, products } = request.body;

            const report: Report<CurrentPositionReport> = await this.reportsService.generateCurrentPositionReport(products, onlyCriticalItems);
            const dto: ReportDto<CurrentPositionReportDto> = ReportDtoMapper.currentPositionDtoMapper(report);

            return response.send(dto);

        } catch (error: any) {

            return next(error);

        }

    };

    async generateProjectionReport(request: Request, response: Response, next: NextFunction): Promise<Response | void> {

        try {

            const { startDate, endDate, onlyCriticalItems, products } = request.body;

            const report: Report<ProjectionReport> = await this.reportsService.generateProjectionReport(startDate, endDate, onlyCriticalItems, products)
            const dto: ReportDto<ProjectionReportDto> = ReportDtoMapper.projectionDtoMapper(report);

            return response.send(dto);

        } catch (error: any) {

            return next(error);

        }

    };

}