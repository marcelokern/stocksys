import { ListMovementDto } from "./movements.dto";

abstract class ReportDtoBase {
    public startDate?: Date;
    public endDate?: Date;
    public totalDays?: number;
    public generatedDate: Date;
}

export class HistoryReportDto extends ReportDtoBase {
    public movement: ListMovementDto;
}


export class CurrentPositionReportDto extends ReportDtoBase {
    public productId: string;
    public productCode: string;
    public productDescription: string;
    public supplierCNPJ: string;
    public supplierCorporateName: string;
    public balance: number;
    public safetyStock: number;
    public isMissing: boolean;
    public isUnderSafetyStock: boolean;
}

export class ProjectionReportDto extends ReportDtoBase {
    public productId: string;
    public productCode: string;
    public productDescription: string;
    public supplierCNPJ: string;
    public supplierCorporateName: string;
    public averageConsumption: number;
    public daysToSafetyStock: number;
    public daysToFinish: number;
    public safetyStockBeforeRepositionTime: boolean;
    public endsBeforeRepositionTime: boolean;
}

export class ReportDto<T> extends ReportDtoBase {
    public reportData: T[];
}