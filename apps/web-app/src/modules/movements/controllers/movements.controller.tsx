import { useToast } from "@/components/ui/use-toast";
import { CreateMovementData } from "../types/movements.types";
import MovementsView from "../views/movements.view";
import { useGlobal } from "@/modules/global/contexts/global.context";
import { useEffect } from "react";

const MovementsController = () => {

    const { toast } = useToast();

    const {
        triggerLoader,
    } = useGlobal();

    const handleListMovements = () => {

        triggerLoader('CONTENT', true);
        setTimeout(() => {
            triggerLoader('CONTENT', false);
        }, 3000);

    }

    const handleCreateMovement = (data: CreateMovementData) => {

        triggerLoader('ACTION', true);
        setTimeout(() => {
            triggerLoader('ACTION', false);
            handleListMovements();
            toast({ variant: 'success', description: `Movimentação registrada com sucesso!` });
        }, 3000);

    }

    useEffect(() => {
        handleListMovements();
    }, []);

    return <MovementsView state={{}} handlers={{ handleCreateMovement }} />;

};

export default MovementsController;