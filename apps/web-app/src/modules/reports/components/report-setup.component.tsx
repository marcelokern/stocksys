import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { DatePickerWithRange } from "@/components/ui/date-picker"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Switch } from "@/components/ui/switch"
import { useProducts } from "@/modules/products/contexts/products.context"
import { ListProductType } from "@/modules/products/types/products.types"
import { CircleFadingPlus, SlidersVertical } from "lucide-react"
import { useEffect, useState } from "react"
import { DateRange } from "react-day-picker"
import { ReportSetupComponentPropsType } from "../types/reports.types"

const ReportSetup = ({ selectedReport, handleGenerateReport, actionLoader }: ReportSetupComponentPropsType) => {

    const { productsList } = useProducts();

    const [dateRange, setDateRange] = useState<DateRange | undefined>();
    const [onlyCriticalItems, setOnlyCriticalItems] = useState<boolean>(false);

    const [allProductsSelected, setAllProductsSelected] = useState<boolean>(false);
    const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

    const handleSelectProducts = (product: string) => {

        const isChecked = selectedProducts.includes(product);

        if (isChecked) {
            setSelectedProducts(prevSelected => prevSelected.filter(item => item !== product));
        } else {
            setSelectedProducts(prevSelected => [...prevSelected, product]);
        }

    };

    const isButtonEnabled = () => {

        if (selectedReport === 'HISTORY' || selectedReport === 'PROJECTION') {
            if ((dateRange?.from && dateRange?.to) && (allProductsSelected || selectedProducts.length !== 0)) return true
        }

        if (selectedReport === 'CURRENT') {
            if (allProductsSelected || selectedProducts.length !== 0) return true
        }

        return false

    };

    useEffect(() => {
        setDateRange(undefined);
        setSelectedProducts([]);
        setAllProductsSelected(false);
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

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant={'outline'} className="p-8 font-semibold">
                                    <CircleFadingPlus className="mr-4" />
                                    {allProductsSelected
                                        ? 'Todos os produtos selecionados'
                                        : (selectedProducts.length === 0
                                            ? 'Nenhum produto selecionado'
                                            : selectedProducts.length + ' produtos selecionados'
                                        )
                                    }
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <ScrollArea className="h-[300px] p-8">

                                    <ul className="flex flex-col gap-2">
                                        <li className="flex flex-row gap-2 items-center">
                                            <Checkbox
                                                id={'all'}
                                                checked={allProductsSelected}
                                                onCheckedChange={() => setAllProductsSelected(!allProductsSelected)}
                                            />
                                            <label htmlFor="all">Todos os produtos</label>
                                        </li>

                                        {productsList.map((x: ListProductType) => (
                                            <li className="flex flex-row gap-2 items-center">
                                                <Checkbox
                                                    id={x.id}
                                                    disabled={allProductsSelected}
                                                    checked={allProductsSelected || selectedProducts.includes(x.id)}
                                                    onCheckedChange={() => handleSelectProducts(x.id)}
                                                />
                                                <label htmlFor={x.id}>{x.description}</label>
                                            </li>
                                        ))}
                                    </ul>

                                </ScrollArea>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {selectedReport !== 'CURRENT' && (
                            <div className="flex flex-col items-center gap-2">
                                <h4 className="text-sm font-extralight">Período de análise</h4>
                                <DatePickerWithRange dateRange={dateRange} setDateRange={setDateRange} />
                            </div>
                        )}

                        {selectedReport !== 'HISTORY' && (
                            <div className="flex flex-row items-center">
                                <Switch id="critical" className="mr-2" onCheckedChange={setOnlyCriticalItems} />
                                <label htmlFor="critical">Somente ítens críticos</label>
                            </div>
                        )}
                    </div>
                    <Button
                        disabled={!isButtonEnabled()}
                        variant={isButtonEnabled() ? 'default' : 'secondary'}
                        onClick={() => handleGenerateReport({
                            products: allProductsSelected ? [] : selectedProducts,
                            dateRange,
                            onlyCriticalItems
                        })}
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