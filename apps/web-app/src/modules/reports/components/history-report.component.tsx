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

      <span className="text-sm font-extralight">{new Date(movement.date).toLocaleDateString('pt-BR')}</span>

      {cardConfig.icon}

      <span className={`flex-1 font-semibold ${cardConfig.textColor}`}>
        {movement.productDescription}
      </span>

      <div>
        <span className="text-sm font-extralight">Descrição: </span>
        <span className="font-bold">{movement.description}</span>
      </div>

      <div>
        <span className="text-sm font-extralight">Quantidade </span>
        <span className="font-bold">{movement.quantity} </span>
        <span className="text-sm font-extralight">{movement.productMeasureUnit} </span>
      </div>

      <div>
        <span className="text-sm font-extralight">Responsável </span>
        <span className="font-bold">{movement.userName}</span>
      </div>

    </Card>

  );

};

export default HistoryReport;
