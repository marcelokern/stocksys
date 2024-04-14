import { ViewPropsType } from "@/modules/global/types/global.types";
import { MovementListItem } from "@/modules/movements/types/movements.types";
import { ReactNode } from "react";
import { DateRange } from "react-day-picker";

export type SelectedReportType = 'HISTORY' | 'CURRENT' | 'PROJECTION'

export type ReportDataType<T> = {
    startDate: string,
    endDate: string,
    totalDays: number,
    generatedDate: string,
    data: T[],
}

export type HistoryReportDataType = {
    movement: MovementListItem
}

export type CurrentPositionReportDataType = {
    productId: string;
    productCode: string;
    productDescription: string;
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
    supplierCNPJ: string;
    supplierCorporateName: string;
    averageConsumption: number;
    daysToSafetyStock: number;
    daysToFinish: number;
    safetyStockBeforeRepositionTime: boolean;
    endsBeforeRepositionTime: boolean;
}

export type ReportsProviderState = {
    selectedReport: SelectedReportType,
    reportData: ReportDataType<HistoryReportDataType | CurrentPositionReportDataType | ProjectionReportDataType>,
    setSelectedReport: React.Dispatch<React.SetStateAction<SelectedReportType>>,
}

type ReportsViewStatePropsType = {}

type ReportsViewHandlersPropsType = {
    handleGenerateReport: (reportConfiguration: { products: string[], dateRange: DateRange, onlyCriticalItems: boolean }) => void
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
    selectedReport: SelectedReportType,
    handleGenerateReport: (reportConfiguration: { products: string[], dateRange: DateRange, onlyCriticalItems: boolean }) => void,
    actionLoader: boolean
}

export type ReportTypeCardComponentPropsType = {
    reportType: SelectedReportType,
    title: string,
    description: string,
    icon: ReactNode,
    selected: boolean,
    handleSelectReport: React.Dispatch<React.SetStateAction<SelectedReportType>>,
}