import { ContextProviderProps } from "@/modules/global/types/global.types";
import { createContext, useContext, useState } from "react";
import { errorHandler } from "@/lib/error-handler";
import movementsService from "../services/movements.service";
import { toast } from "@/components/ui/use-toast";
import { CreateMovementType, ListMovementType, MovementsProviderType } from "../types/movements.types";

const MovementsProviderContext = createContext<MovementsProviderType>({} as MovementsProviderType)

export function MovementsProvider({ children }: ContextProviderProps) {

    const [movementsList, setMovementsList] = useState<ListMovementType[]>([] as ListMovementType[]);

    const listMovements = async () => {

        try {

            const response = await movementsService.listMovements();
            setMovementsList(response);

        } catch (error: any) {

            errorHandler(error);

        }

    }

    const createMovement = async (data: CreateMovementType) => {

        try {

            const response = await movementsService.createMovement(data);
            toast({
                description: response.message,
                variant: 'success'
            })

        } catch (error: any) {

            errorHandler(error);

        }

    }

    const value = {
        movementsList,
        listMovements,
        createMovement
    }

    return (
        <MovementsProviderContext.Provider value={value}>
            {children}
        </MovementsProviderContext.Provider>
    )
}

export const useMovements = () => {

    return useContext(MovementsProviderContext);

}