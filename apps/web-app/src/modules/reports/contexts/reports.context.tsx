import { ContextProviderProps } from "@/modules/global/types/global.types";
import { createContext, useContext, useState } from "react";
import { CurrentPositionReportDataType, CurrentPositionReportSetupType, HistoryReportDataType, HistoryReportSetupType, ProjectionReportDataType, ProjectionReportSetupType, ReportType, ReportsProviderType } from "../types/reports.types";
import reportsService from "../services/reports.service";
import { errorHandler } from "@/lib/error-handler";

const ReportsProviderContext = createContext<ReportsProviderType>({} as ReportsProviderType)

export function ReportsProvider({ children }: ContextProviderProps) {

    const [selectedReport, setSelectedReport] = useState<string>('');

    const [report, setReport] = useState<ReportType<HistoryReportDataType | CurrentPositionReportDataType | ProjectionReportDataType>>({} as ReportType<HistoryReportDataType | CurrentPositionReportDataType | ProjectionReportDataType>);

    const generateHistoryReport = async (data: HistoryReportSetupType) => {

        try {

            const response = await reportsService.historyReport(data)
            setReport(response);
            return true;

        } catch (error: any) {

            errorHandler(error);
            return false;

        }

    }

    const generateCurrentPositionReport = async (data: CurrentPositionReportSetupType) => {

        try {

            const response = await reportsService.currentPositionReport(data)
            setReport(response);
            return true;

        } catch (error: any) {

            errorHandler(error);
            return false;

        }

    }

    const generateProjectionReport = async (data: ProjectionReportSetupType) => {

        try {

            const response = await reportsService.projectionReport(data)
            setReport(response);
            return true;

        } catch (error: any) {

            errorHandler(error);
            return false;

        }

    }

    const value = {
        selectedReport,
        report,
        setSelectedReport,
        generateHistoryReport,
        generateCurrentPositionReport,
        generateProjectionReport
    };

    return (
        <ReportsProviderContext.Provider value={value}>
            {children}
        </ReportsProviderContext.Provider>
    )

}

export const useReports = () => {

    return useContext(ReportsProviderContext);

}