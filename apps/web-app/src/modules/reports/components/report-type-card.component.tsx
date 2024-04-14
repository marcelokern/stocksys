import { Card } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"
import { ReportTypeCardComponentPropsType } from "../types/reports.types"

const ReportTypeCard = ({ reportType, title, description, icon, selected, handleSelectReport }: ReportTypeCardComponentPropsType) => {

    return (

        <Card
            onClick={() => { handleSelectReport(reportType) }}
            className={`p-8 flex flex-row items-center justify-start flex-1 border-b-8 hover:opacity-75 cursor-pointer ${selected && 'border-b-primary'}`}
        >

            {icon}

            <div className="mx-6 flex flex-col max-w-[300px]">
                <h2 className={`font-semibold text-lg ${selected && 'text-primary'}`}>{title}</h2>
                <h4 className="text-sm font-extralight">{description}</h4>
            </div>

            <ChevronRight className="w-10 h-10" />

        </Card>

    )

}

export default ReportTypeCard;