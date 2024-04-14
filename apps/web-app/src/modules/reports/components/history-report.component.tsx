import { Card } from "@/components/ui/card";
import { ArrowDown, ArrowUp, ArrowUpFromLine } from "lucide-react";
import { HistoryReportComponentPropsType } from "../types/reports.types";

const HistoryReport = ({ data: { movement } }: HistoryReportComponentPropsType) => {

  const cardConfig = {
    IN: {
      borderColor: 'border-green-500',
      textColor: 'text-green-500',
      icon: <ArrowUp className="text-green-500" />
    },
    OUT: {
      borderColor: 'border-red-700',
      textColor: 'text-red-700',
      icon: <ArrowDown className="text-red-700" />
    },
    BAL: {
      borderColor: 'border-sky-500',
      textColor: 'text-sky-500',
      icon: <ArrowUpFromLine className="text-sky-500" />
    }
  }[movement.type]

  return (

    <Card className={`flex flex-row items-center justify-between gap-6 p-6 ${cardConfig.borderColor}`}>

      <span className="text-sm font-extralight">{movement.date}</span>

      {cardConfig.icon}

      <span className={`flex-1 font-semibold ${cardConfig.textColor}`}>
        {movement.productDescription}
      </span>

      <span className="font-bold">{movement.description}</span>

      <div>
        <span className="text-sm font-extralight">Quantidade </span>
        <span className="font-bold">{movement.quantity}</span>
      </div>

      <div>
        <span className="text-sm font-extralight">Responsável </span>
        <span className="font-bold">{movement.userName}</span>
      </div>

    </Card>

  );

};

export default HistoryReport;
