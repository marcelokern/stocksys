import { ViewPropsType } from "@/modules/global/types/global.types";
import { ListMovementType } from "@/modules/movements/types/movements.types";
import { ReactNode } from "react";
import { DateRange } from "react-day-picker";

export type HistoryReportSetupType = {
    products: string[],
    startDate: string,
    endDate: string,
}

export type CurrentPositionReportSetupType = {
    products: string[],
    onlyCriticalItems: boolean
}

export type ProjectionReportSetupType = {
    products: string[],
    startDate: string,
    endDate: string,
    onlyCriticalItems: boolean
}

export type HistoryReportDataType = {
    movement: ListMovementType
}

export type CurrentPositionReportDataType = {
    productId: string;
    productCode: string;
    productDescription: string;
    productMeasureUnit: string;
    supplierCNPJ: string;
    supplierCorporateName: string;
    balance: number;
    safetyStock: number;
    isMissing: boolean;
    isUnderSafetyStock: boolean;
}

export type ProjectionReportDataType = {
    productId: string;
    productCode: string;
    productDescription: string;
    productMeasureUnit: string;
    productBalance: number;
    productRepositionTime: string;
    supplierCNPJ: string;
    supplierCorporateName: string;
    averageConsumption: number;
    daysToSafetyStock: number;
    daysToFinish: number;
    safetyStockBeforeRepositionTime: boolean;
    endsBeforeRepositionTime: boolean;
}

export type ReportType<T> = {
    startDate: string,
    endDate: string,
    totalDays: number,
    generatedDate: string,
    reportData: T[],
}

export type HistoryReportRequestType = HistoryReportSetupType;

export type HistoryReportResponseType = ReportType<HistoryReportDataType>;

export type CurrentPositionReportRequestType = CurrentPositionReportSetupType;

export type CurrentPositionReportResponseType = ReportType<CurrentPositionReportDataType>;

export type ProjectionReportRequestType = ProjectionReportSetupType;

export type ProjectionReportResponseType = ReportType<ProjectionReportDataType>;

export type ReportsProviderType = {
    selectedReport: string,
    report: ReportType<HistoryReportDataType | CurrentPositionReportDataType | ProjectionReportDataType>,
    setSelectedReport: React.Dispatch<React.SetStateAction<string>>,
    generateHistoryReport: (reportSetup: HistoryReportSetupType) => Promise<boolean>,
    generateCurrentPositionReport: (reportSetup: CurrentPositionReportSetupType) => Promise<boolean>,
    generateProjectionReport: (reportSetup: ProjectionReportSetupType) => Promise<boolean>,
}

type ReportsViewStatePropsType = {}

type ReportsViewHandlersPropsType = {
    handleGenerateReport: (setup: { products: string[], dateRange: DateRange, onlyCriticalItems: boolean }) => Promise<void>
}

export type ReportsViewPropsType = ViewPropsType<ReportsViewStatePropsType, ReportsViewHandlersPropsType>;

type ReportDetailsViewStatePropsType = {}

type ReportDetailsViewHandlersPropsType = {}

export type ReportDetailsViewPropsType = ViewPropsType<ReportDetailsViewStatePropsType, ReportDetailsViewHandlersPropsType>;

export type HistoryReportComponentPropsType = {
    data: HistoryReportDataType
}

export type CurrentPositionComponentReportPropsType = {
    data: CurrentPositionReportDataType
}

export type ProjectionReportComponentPropsType = {
    data: ProjectionReportDataType
}

export type ReportSetupComponentPropsType = {
    selectedReport: string,
    handleGenerateReport: (setup: { products: string[], dateRange: DateRange, onlyCriticalItems: boolean }) => Promise<void>
    actionLoader: boolean
}

export type ReportTypeCardComponentPropsType = {
    reportType: string,
    title: string,
    description: string,
    icon: ReactNode,
    selected: boolean,
    handleSelectReport: React.Dispatch<React.SetStateAction<string>>,
}