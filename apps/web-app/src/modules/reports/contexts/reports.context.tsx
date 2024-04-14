import { ContextProviderProps } from "@/modules/global/types/global.types";
import { createContext, useContext, useState } from "react";
import { CurrentPositionReportDataType, HistoryReportDataType, ProjectionReportDataType, ReportDataType, ReportsProviderState, SelectedReportType } from "../types/reports.types";

const ReportsProviderContext = createContext<ReportsProviderState>({} as ReportsProviderState)

export function ReportsProvider({ children }: ContextProviderProps) {

    const [selectedReport, setSelectedReport] = useState<SelectedReportType>();

    const [reportData, setReportData] = useState<ReportDataType<HistoryReportDataType | CurrentPositionReportDataType | ProjectionReportDataType>>({ data: [] });

    const value = { selectedReport, reportData, setSelectedReport };

    return (
        <ReportsProviderContext.Provider value={value}>
            {children}
        </ReportsProviderContext.Provider>
    )

}

export const useReports = () => {

    return useContext(ReportsProviderContext);

}