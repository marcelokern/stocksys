import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DatePickerWithRange } from "@/components/ui/date-picker"
import { Switch } from "@/components/ui/switch"
import { CircleFadingPlus, SlidersVertical, X } from "lucide-react"
import { useEffect, useState } from "react"
import { DateRange } from "react-day-picker"
import { ReportSetupComponentPropsType } from "../types/reports.types"

const ReportSetup = ({ selectedReport, handleGenerateReport, actionLoader }: ReportSetupComponentPropsType) => {

    const [dateRange, setDateRange] = useState<DateRange | undefined>();
    const [products, setProducts] = useState<string[]>([]);
    const [onlyCriticalItems, setOnlyCriticalItems] = useState<boolean>(false);

    const isButtonEnabled = () => {
        if (selectedReport !== 'CURRENT') {
            if (dateRange?.from && dateRange?.to) return true
            return false
        }
        return true;
    };

    useEffect(() => {
        setDateRange(undefined);
        setProducts([]);
        setOnlyCriticalItems(false);
    }, [selectedReport])

    return (

        <Card className="flex flex-col items-center gap-10 p-10 flex-1 justify-center border-b-8">

            {!selectedReport ? (
                <>
                    <SlidersVertical className="w-12 h-12 opacity-20" />
                    <h2 className="font-extralight text-xl mb-2 opacity-20">Selecione um relatório para continuar</h2>
                </>
            ) : (
                <>
                    <div className="flex flex-col items-center gap-3">
                        <SlidersVertical className="w-12 h-12 text-primary"></SlidersVertical>
                        <h2 className="font-semibold text-3xl">Configurar Relatório</h2>
                        <h4 className="text-sm font-extralight">Selecione abaixo os parâmetros desejados para a análise</h4>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-6">
                        <Button variant={'outline'} className="p-8">
                            <CircleFadingPlus className="mr-4" />
                            Adicionar produtos
                            <X className="h-3 w-3 ml-4" />
                        </Button>

                        {selectedReport !== 'CURRENT' && (
                            <div className="flex flex-col items-center gap-2">
                                <h4 className="text-sm font-extralight">Período de análise</h4>
                                <DatePickerWithRange dateRange={dateRange} setDateRange={setDateRange} />
                            </div>
                        )}

                        {selectedReport !== 'HISTORY' && (
                            <div className="flex flex-row items-center">
                                <Switch id="critical" className="mr-1" onCheckedChange={setOnlyCriticalItems} />
                                <label htmlFor="critical">Somente ítens críticos</label>
                            </div>
                        )}
                    </div>
                    <Button
                        disabled={!isButtonEnabled()}
                        variant={isButtonEnabled() ? 'default' : 'secondary'}
                        onClick={() => handleGenerateReport({ products, dateRange, onlyCriticalItems })}
                        loading={actionLoader}
                        className="p-6"
                    >
                        Gerar relatório
                    </Button>
                </>
            )}

        </Card>

    )

}

export default ReportSetup