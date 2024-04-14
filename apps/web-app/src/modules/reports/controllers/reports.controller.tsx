import { useNavigate } from "react-router-dom";
import ReportsView from "../views/reports.view";
import { DateRange } from "react-day-picker";
import { useGlobal } from "@/modules/global/contexts/global.context";

const ReportsController = () => {

    const navigate = useNavigate();
    const { triggerLoader } = useGlobal();

    const handleGenerateReport = (reportConfiguration: { products: string[], dateRange: DateRange, onlyCriticalItems: boolean }) => {

        triggerLoader('ACTION', true);
        setTimeout(() => {
            triggerLoader('ACTION', false);
            navigate('/relatorios/detalhes');
        }, 3000);

    }

    return <ReportsView state={{}} handlers={{ handleGenerateReport }} />;

};

export default ReportsController;