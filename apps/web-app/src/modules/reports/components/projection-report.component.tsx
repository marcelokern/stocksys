import { Card } from "@/components/ui/card"
import { TriangleAlert } from "lucide-react"
import { ProjectionReportComponentPropsType } from "../types/reports.types"

const ProjectionReport = ({ data }: ProjectionReportComponentPropsType) => {

    const alertConfig = () => {

        if (data.endsBeforeRepositionTime) {
            return {
                borderColor: 'border-red-700',
                textColor: 'text-red-700',

            }
        }

        return {
            borderColor: 'border-yellow-500',
            textColor: 'text-yellow-500',
        }

    }

    return (

        <Card className={`flex flex-col items-center gap-4 p-6 ${(data.endsBeforeRepositionTime || data.safetyStockBeforeRepositionTime) && alertConfig()?.borderColor}`}>

            <div className="flex flex-row items-center gap-4 w-full">

                <span className="text-sm font-extralight">{data.productCode}</span>

                <span className={`text-xl font-semibold flex-1 ${(data.endsBeforeRepositionTime || data.safetyStockBeforeRepositionTime) && alertConfig()?.textColor}`}>{data.productDescription}</span>

                {data.safetyStockBeforeRepositionTime && !data.endsBeforeRepositionTime && (

                    <span className="text-sm font-extralight flex flex-row items-center text-yellow-500">
                        <TriangleAlert className="h-4 w-4 mr-2" />Este produto irá atingir o estoque de segurança antes do tempo de reposição.
                    </span>

                )}

                {data.endsBeforeRepositionTime && (

                    <span className="text-sm font-extralight flex flex-row items-center text-red-700">
                        <TriangleAlert className="h-4 w-4 mr-2" />Este produto irá entrar em falta antes do tempo de reposição.
                    </span>

                )}

            </div>

            <div className="flex flex-row items-center gap-4 w-full">

                <div className="flex flex-row items-center">
                    <span className="text-sm font-extralight mr-2">Estoque atual </span>
                    <span className={`font-bold text-xl ${(data.endsBeforeRepositionTime || data.safetyStockBeforeRepositionTime) && alertConfig()?.textColor}`}>{data.productBalance}</span>
                    <span className="text-sm font-extralight ml-2">{data.productMeasureUnit}</span>
                </div>


                <div className="flex flex-row items-center">
                    <span className="text-sm font-extralight mr-2">Consumo médio diário </span>
                    <span className={`font-bold text-xl mr-2${(data.endsBeforeRepositionTime || data.safetyStockBeforeRepositionTime) && alertConfig()?.textColor}`}>{data.averageConsumption}</span>
                    <span className="text-sm font-extralight ml-2">{data.productMeasureUnit}</span>
                </div>

                <div className="flex flex-row items-center flex-1">
                    <span className="text-sm font-extralight mr-2">Tempo de reposição </span>
                    <span className="font-bold text-xl">{data.productRepositionTime}</span>
                    <span className="text-sm font-extralight ml-2">dias</span>
                </div>

                <div className="flex flex-row items-center">
                    <span className="text-sm font-extralight mr-2">Dias para atingir o estoque de segurança </span>
                    <span className="font-bold text-xl">{data.daysToSafetyStock || '--'}</span>
                </div>

                <div className="flex flex-row items-center">
                    <span className="text-sm font-extralight mr-2">Dias para terminar </span>
                    <span className="font-bold text-xl">{data.daysToFinish || '--'}</span>
                </div>

            </div>

        </Card>

    )

}

export default ProjectionReport