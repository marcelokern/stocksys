import { useNavigate } from "react-router-dom";
import ReportsView from "../views/reports.view";
import { useGlobal } from "@/modules/global/contexts/global.context";
import { useReports } from "../contexts/reports.context";
import { DateRange } from "react-day-picker";
import { useProducts } from "@/modules/products/contexts/products.context";
import { useEffect } from "react";

const ReportsController = () => {

    const navigate = useNavigate();
    const { triggerLoader } = useGlobal();

    const {
        selectedReport,
        generateHistoryReport,
        generateCurrentPositionReport,
        generateProjectionReport
    } = useReports();

    const { listProducts } = useProducts();

    const handleGenerateReport = async (setup: { products: string[], dateRange: DateRange, onlyCriticalItems: boolean }) => {

        triggerLoader('ACTION', true);

        switch (selectedReport) {
            case 'HISTORY': {
                const actionResult = await generateHistoryReport({
                    startDate: new Date(setup.dateRange.from).toISOString(),
                    endDate: new Date(setup.dateRange.to).toISOString(),
                    products: setup.products
                });
                if (actionResult) navigate('/relatorios/detalhes'); break;
            }
            case 'CURRENT': {
                const actionResult = await generateCurrentPositionReport({
                    products: setup.products,
                    onlyCriticalItems: setup.onlyCriticalItems
                });
                if (actionResult) navigate('/relatorios/detalhes'); break;
            }
            case 'PROJECTION': {
                const actionResult = await generateProjectionReport({
                    startDate: new Date(setup.dateRange.from).toISOString(),
                    endDate: new Date(setup.dateRange.to).toISOString(),
                    products: setup.products,
                    onlyCriticalItems: setup.onlyCriticalItems
                });
                if (actionResult) navigate('/relatorios/detalhes'); break;
            }
        }

        triggerLoader('ACTION', false);

    }

    useEffect(() => { listProducts() }, [])

    return <ReportsView state={{}} handlers={{ handleGenerateReport }} />;

};

export default ReportsController;