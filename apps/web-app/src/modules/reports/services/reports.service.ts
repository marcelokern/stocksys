import requester from "@/lib/requester";
import { CurrentPositionReportRequestType, CurrentPositionReportResponseType, HistoryReportRequestType, HistoryReportResponseType, ProjectionReportRequestType, ProjectionReportResponseType } from "../types/reports.types";

const reportsService = {

    historyReport: async (data: HistoryReportRequestType) =>
        await requester<HistoryReportRequestType, HistoryReportResponseType>('POST', '/reports/history', data),

    currentPositionReport: async (data: CurrentPositionReportRequestType) =>
        await requester<CurrentPositionReportRequestType, CurrentPositionReportResponseType>('POST', '/reports/current-position', data),

    projectionReport: async (data: ProjectionReportRequestType) =>
        await requester<ProjectionReportRequestType, ProjectionReportResponseType>('POST', '/reports/projection', data),

}

export default reportsService;