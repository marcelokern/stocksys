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

    const { selectedReport, reportData } = useReports();

    const reportTitle = {
        HISTORY: 'Histórico de Movimentações',
        CURRENT: 'Posição Atual do Estoque',
        PROJECTION: 'Projeção de Estoque',
    }[selectedReport];

    return !selectedReport ? <Navigate to={'/relatorios'} /> : (

        <MainContainer>

            <MainTitle
                title={['Relatórios', reportTitle]}
                buttons={[
                    <Button onClick={() => navigate('/relatorios')} className="flex flex-row items-center gap-2">
                        <CircleFadingPlus />Novo relatório
                    </Button>
                ]}
            />

            {reportData.data.length !== 0 && (

                <h4 className="flex flex-row items-center text-sm font-extralight mb-6">
                    <Info className="w-4 h-4 mr-2" />
                    {selectedReport === 'HISTORY' && `Analisando o histórico de ${reportData.data.length} movimentações no período de ${reportData.startDate} à ${reportData.endDate}`}
                    {selectedReport === 'CURRENT' && `Analisando o estoque de ${reportData.data.length} produtos.`}
                    {selectedReport === 'PROJECTION' && `Analisando a projeção de estoque de ${reportData.data.length} produtos considerando o período de ${reportData.startDate} à ${reportData.endDate}`}
                </h4>

            )}

            {reportData.data.length === 0 ? (
                <div className="w-full flex-1 p-8 text-center opacity-30 flex flex-col justify-center items-center gap-4">
                    Ops... Sem dados para o relatório selecionado.<br />
                    Por favor, ajuste os parâmetros e tente novamente.<br />
                    <Button variant={'secondary'}><ArrowLeft className="mr-2" />Voltar</Button>
                </div>
            ) : (
                reportData.data.map((x, i) => {
                    if (selectedReport === 'HISTORY') return <HistoryReport data={x} key={i} />
                    if (selectedReport === 'CURRENT') return <CurrentPositionReport data={x} key={i} />
                    if (selectedReport === 'PROJECTION') return <ProjectionReport data={x} key={i} />
                })
            )}

        </MainContainer>

    )

};

export default ReportDetailsView;