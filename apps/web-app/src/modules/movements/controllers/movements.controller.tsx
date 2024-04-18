import MovementsView from "../views/movements.view";
import { useGlobal } from "@/modules/global/contexts/global.context";
import { useEffect } from "react";
import { useMovements } from "../contexts/movements.context";
import { CreateMovementFormSchemaType } from "../types/movements.types";
import { useProducts } from "@/modules/products/contexts/products.context";

const MovementsController = () => {

    const {
        triggerLoader,
    } = useGlobal();

    const {
        listMovements,
        createMovement
    } = useMovements()

    const { listProducts } = useProducts();

    const handleListMovements = async () => {

        triggerLoader('CONTENT', true);
        await listMovements();
        triggerLoader('CONTENT', false);

    }

    const handleCreateMovement = async (data: CreateMovementFormSchemaType) => {

        triggerLoader('ACTION', true);
        const date = new Date();
        await createMovement({ ...data, date: date.toISOString() });
        triggerLoader('ACTION', false);
        handleListMovements();

    }

    useEffect(() => {
        handleListMovements();
        listProducts();
    }, []);

    return <MovementsView state={{}} handlers={{ handleCreateMovement }} />;

};

export default MovementsController;