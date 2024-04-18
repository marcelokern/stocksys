import MainTitle from '@/modules/global/components/main-title.component';
import MainContainer from '@/modules/global/components/main.component';
import ReportTypeCard from '../components/report-type-card.component';
import ReportSetup from '../components/report-setup.component';
import { ReportsViewPropsType } from '../types/reports.types';
import { Activity, History, LineChart } from "lucide-react"
import { useReports } from '../contexts/reports.context';
import { useGlobal } from '@/modules/global/contexts/global.context';

const ReportsView = ({ handlers }: ReportsViewPropsType) => {

    const { actionLoader } = useGlobal();
    const { selectedReport, setSelectedReport } = useReports();

    const { handleGenerateReport } = handlers;

    return (

        <MainContainer>

            <MainTitle title={['Relatórios']} />

            <div className='flex flex-row gap-6 flex-1'>

                <div className="flex flex-col gap-3">

                    <ReportTypeCard
                        reportType={'HISTORY'}
                        title={'Histórico de Movimentações'}
                        description={'Análise do histórico de movimentações por período de tempo'}
                        icon={<History className='w-10 h-10 text-primary' />}
                        selected={selectedReport === 'HISTORY'}
                        handleSelectReport={setSelectedReport}
                    />

                    <ReportTypeCard
                        reportType={'CURRENT'}
                        title={'Posição Atual do Estoque'}
                        description={'Análise comparativa entre balanço atual, estoque de segurança e ítens em falta'}
                        icon={<Activity className='w-10 h-10 text-primary' />}
                        selected={selectedReport === 'CURRENT'}
                        handleSelectReport={setSelectedReport}
                    />

                    <ReportTypeCard
                        reportType={'PROJECTION'}
                        title={'Projeção de Estoque'}
                        description={'Projeção futura de estoque comparativa entre consumo médio e tempo de reposição'}
                        icon={<LineChart className='w-10 h-10 text-primary' />}
                        selected={selectedReport === 'PROJECTION'}
                        handleSelectReport={setSelectedReport}
                    />

                </div>

                <ReportSetup
                    selectedReport={selectedReport}
                    handleGenerateReport={handleGenerateReport}
                    actionLoader={actionLoader}
                />

            </div>

        </MainContainer>

    );
};

export default ReportsView;