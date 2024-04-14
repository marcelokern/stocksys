import { ContextProviderProps } from "@/modules/global/types/global.types";
import { createContext, useContext, useState } from "react";
import { MovementListItem, MovementsProviderState } from "../types/movements.types";

const MovementsProviderContext = createContext<MovementsProviderState>({} as MovementsProviderState)

export function MovementsProvider({ children }: ContextProviderProps) {

    const [movementsList, setMovementsList] = useState<MovementListItem[]>([]);

    const value = {
        movementsList
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