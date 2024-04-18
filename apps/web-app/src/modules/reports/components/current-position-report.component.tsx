import { Card } from "@/components/ui/card"
import { TriangleAlert } from "lucide-react"
import { CurrentPositionComponentReportPropsType } from "../types/reports.types"

const CurrentPositionReport = ({ data }: CurrentPositionComponentReportPropsType) => {

    const alertConfig = () => {

        if (data.isMissing) {
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

        <Card className={`flex flex-row items-center gap-4 p-6 ${(data.isMissing || data.isUnderSafetyStock) && alertConfig()?.borderColor}`}>

            <span className="text-sm font-extralight">{data.productCode}</span>
            <span className={`text-xl font-semibold flex-1 ${(data.isMissing || data.isUnderSafetyStock) && alertConfig()?.textColor}`}>{data.productDescription}</span>

            {data.isUnderSafetyStock && !data.isMissing && (

                <span className="text-sm font-extralight flex flex-row items-center text-yellow-500">
                    <TriangleAlert className="h-4 w-4 mr-2" />Este produto está abaixo do estoque de segurança
                </span>

            )}

            {data.isMissing && (

                <span className="text-sm font-extralight flex flex-row items-center text-red-700">
                    <TriangleAlert className="h-4 w-4 mr-2" />Este produto está em falta
                </span>

            )}

            <div className="flex flex-row items-center">
                <span className="text-sm font-extralight mr-2">Estoque atual </span>
                <span className={`font-bold text-xl mr-2 ${(data.isMissing || data.isUnderSafetyStock) && alertConfig()?.textColor}`}>{data.balance}</span>
                <span className="text-sm font-extralight mr-2">{data.productMeasureUnit}</span>
            </div>

            <div className="flex flex-row items-center">
                <span className="text-sm font-extralight mr-2">Estoque de segurança </span>
                <span className="font-bold text-xl mr-2">{data.safetyStock} </span>
                <span className="text-sm font-extralight mr-2">{data.productMeasureUnit}</span>
            </div>

        </Card>
    )

}

export default CurrentPositionReport