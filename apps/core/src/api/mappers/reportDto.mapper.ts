import { CurrentPositionReport, HistoryReport, ProjectionReport, Report } from '../../domain/models/report.model';
import { HistoryReportDto, CurrentPositionReportDto, ReportDto, ProjectionReportDto } from '../dtos/reports.dto';
import { MovementDtoMapper } from './movementDto.mapper';

export class ReportDtoMapper {

    public static historyReportDtoMapper(report: Report<HistoryReport>): ReportDto<HistoryReportDto> {

        const dto = new ReportDto<HistoryReportDto>;

        dto.startDate = report.startDate;
        dto.endDate = report.endDate;
        dto.totalDays = report.totalDays;
        dto.generatedDate = report.generatedDate;

        dto.reportData = report.reportData.map((item: HistoryReport) => {

            const reportDataDto = new HistoryReportDto();

            reportDataDto.movement = MovementDtoMapper.listMovementDtoMapper(item.movement);

            return reportDataDto;

        })

        return dto;

    };

    public static currentPositionDtoMapper(report: Report<CurrentPositionReport>): ReportDto<CurrentPositionReportDto> {

        const dto = new ReportDto<CurrentPositionReportDto>;

        dto.generatedDate = report.generatedDate;

        dto.reportData = report.reportData.map((item: CurrentPositionReport) => {

            const reportDataDto = new CurrentPositionReportDto();

            reportDataDto.productId = item.product.id;
            reportDataDto.productCode = item.product.code;
            reportDataDto.productDescription = item.product.description;
            reportDataDto.productMeasureUnit = item.product.measureUnit;
            reportDataDto.supplierCNPJ = item.product.supplier.cnpj;
            reportDataDto.supplierCorporateName = item.product.supplier.corporateName;
            reportDataDto.balance = item.product.balance;
            reportDataDto.safetyStock = item.product.safetyStock;
            reportDataDto.isMissing = item.isMissing;
            reportDataDto.isUnderSafetyStock = item.isUnderSafetyStock;

            return reportDataDto;

        })

        return dto;

    };

    public static projectionDtoMapper(report: Report<ProjectionReport>): ReportDto<ProjectionReportDto> {

        const dto = new ReportDto<ProjectionReportDto>;

        dto.startDate = report.startDate;
        dto.endDate = report.endDate;
        dto.totalDays = report.totalDays;
        dto.generatedDate = report.generatedDate;

        dto.reportData = report.reportData.map((item: ProjectionReport) => {

            const reportDataDto = new ProjectionReportDto();

            reportDataDto.productId = item.product.id;
            reportDataDto.productCode = item.product.code;
            reportDataDto.productDescription = item.product.description;
            reportDataDto.productMeasureUnit = item.product.measureUnit;
            reportDataDto.productBalance = item.product.balance;
            reportDataDto.productRepositionTime = item.product.repositionTime;
            reportDataDto.supplierCNPJ = item.product.supplier.cnpj;
            reportDataDto.supplierCorporateName = item.product.supplier.corporateName;
            reportDataDto.averageConsumption = Math.round(item.averageConsumption);
            reportDataDto.daysToSafetyStock = Math.round(item.daysToSafetyStock);
            reportDataDto.daysToFinish = Math.round(item.daysToFinish);
            reportDataDto.safetyStockBeforeRepositionTime = item.safetyStockBeforeRepositionTime;
            reportDataDto.endsBeforeRepositionTime = item.endsBeforeRepositionTime;

            return reportDataDto;

        })

        return dto;

    };

}