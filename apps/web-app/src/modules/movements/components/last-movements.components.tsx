import { Card } from '@/components/ui/card';
import { ArrowDown, ArrowUp, ArrowUpFromLine, Loader } from "lucide-react";
import { LastMovementComponentPropsType, ListMovementType } from '../types/movements.types';

const LastMovements = ({ data, loading }: LastMovementComponentPropsType) => {

    const movementConfig = {
        IN: {
            icon: <ArrowUp className="text-green-500" />,
            color: '-green-500'
        },
        OUT: {
            icon: <ArrowDown className="text-red-700" />,
            color: '-red-700'
        },
        BAL: {
            icon: <ArrowUpFromLine className="text-sky-500" />,
            color: '-sky-500'
        }
    }

    return (

        <div className='flex flex-col gap-3 px-6 w-[40%]'>

            <h1 className="text-xl font-light flex flex-row items-center mb-4">Últimas movimentações</h1>

            {loading ? (

                <div className="w-full flex flex-row items-center justify-start gap-3">
                    <Loader className="animate-spin text-primary w-6 h-6" />Carregando movimentações...
                </div>

            ) : (data.length === 0 ? (

                <div className="w-full opacity-30">Nenhuma movimentação recente</div>

            ) : data.map((x: ListMovementType, i: number) => (

                <Card key={i} className={`flex flex-row items-center justify-between gap-6 p-4 border${movementConfig[x.type].color}`}>
                    <span className="text-sm font-extralight">{new Date(x.date).toLocaleDateString('pt-BR')}</span>
                    {movementConfig[x.type].icon}
                    <span className={`text${movementConfig[x.type].color} font-semibold flex-1`}>{x.productDescription}</span>
                    <span className="font-medium">{x.description}</span>
                    <div>
                        <span className="font-medium">{x.quantity} </span>
                        <span className="text-sm font-extralight">{x.productMeasureUnit}</span>
                    </div>
                </Card>

            )))}

        </div>
    );
};

export default LastMovements;