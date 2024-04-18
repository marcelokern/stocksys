import MainTitle from "@/modules/global/components/main-title.component";
import MainContainer from "@/modules/global/components/main.component";
import { ArrowLeft, CircleFadingPlus, Info } from "lucide-react";
import { ReportDetailsViewPropsType } from "../types/reports.types";
import CurrentPositionReport from "../components/current-position-report.component";
import ProjectionReport from "../components/projection-report.component";
import HistoryReport from "../components/history-report.component";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useReports } from "../contexts/reports.context";

const ReportDetailsView = ({ state, handlers }: ReportDetailsViewPropsType) => {

    const navigate = useNavigate();

    const { selectedReport, report } = useReports();

    const reportTitle = {
        HISTORY: 'Histórico de Movimentações',
        CURRENT: 'Posição Atual do Estoque',
        PROJECTION: 'Projeção de Estoque',
    }[selectedReport] || '';

    return (!selectedReport || !report) ? <Navigate to={'/relatorios'} /> : (

        <MainContainer>

            <MainTitle
                title={['Relatórios', reportTitle]}
                buttons={[
                    <Button onClick={() => navigate('/relatorios')} className="flex flex-row items-center gap-2">
                        <CircleFadingPlus />Novo relatório
                    </Button>
                ]}
            />

            {report.reportData.length !== 0 && (

                <h4 className="flex flex-row items-center text-sm font-extralight mb-6">
                    <Info className="w-4 h-4 mr-2" />
                    {selectedReport === 'HISTORY' &&
                        `Analisando o histórico de ${report.reportData.length} movimentações no período de ${new Date(report.startDate).toLocaleDateString('pt-BR')} à ${new Date(report.endDate).toLocaleDateString('pt-BR')}`}
                    {selectedReport === 'CURRENT'
                        && `Analisando o estoque de ${report.reportData.length} produtos.`}
                    {selectedReport === 'PROJECTION'
                        && `Analisando a projeção de estoque de ${report.reportData.length} produtos considerando o período de ${new Date(report.startDate).toLocaleDateString('pt-BR')} à ${new Date(report.endDate).toLocaleDateString('pt-BR')}`}
                </h4>

            )}

            {report.reportData.length === 0 ? (
                <div className="w-full flex-1 p-8 text-center opacity-30 flex flex-col justify-center items-center gap-4">
                    Ops... Sem dados para o relatório selecionado.<br />
                    Por favor, ajuste os parâmetros e tente novamente.<br />
                    <Button variant={'secondary'} onClick={() => navigate('/relatorios')}><ArrowLeft className="mr-2" />Voltar</Button>
                </div>
            ) : (
                report.reportData.map((x: any, i: number) => {
                    if (selectedReport === 'HISTORY') return <HistoryReport data={x} key={i} />
                    if (selectedReport === 'CURRENT') return <CurrentPositionReport data={x} key={i} />
                    if (selectedReport === 'PROJECTION') return <ProjectionReport data={x} key={i} />
                })
            )}

        </MainContainer>

    )

};

export default ReportDetailsView;