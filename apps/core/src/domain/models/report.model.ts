import { Movement } from "./movement.model";
import { Product } from "./product.model";

abstract class ReportBase {
    public startDate: Date;
    public endDate: Date;
    public totalDays: number;
    public generatedDate: Date;
}

export class HistoryReport {
    public movement: Movement;
}

export class CurrentPositionReport {
    public product: Product;
    public isUnderSafetyStock: boolean;
    public isMissing: boolean;
}

export class ProjectionReport {
    public product: Product;
    public averageConsumption: number;
    public daysToSafetyStock: number;
    public daysToFinish: number;
    public safetyStockBeforeRepositionTime: boolean;
    public endsBeforeRepositionTime: boolean;
}

export class Report<T> extends ReportBase {
    public reportData: T[];
}