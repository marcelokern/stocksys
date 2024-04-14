import { ViewPropsType } from "@/modules/global/types/global.types";

export type MovementListItem = {
    id: string,
    description: string,
    date: string,
    productCode: string,
    productDescription: string,
    quantity: number,
    type: 'IN' | 'OUT' | 'BAL',
    userId: string,
    userName: string,
}

export type CreateMovementData = {
    quantity: number,
    description: string,
    type: string,
    productId: string,
    date?: string,
}

export type MovementsProviderState = {
    movementsList: MovementListItem[],
}

type MovementsViewStatePropsType = {}

type MovementsViewHandlersPropsType = {
    handleCreateMovement: (data: CreateMovementData) => void,
}

export type MovementsViewPropsType = ViewPropsType<MovementsViewStatePropsType, MovementsViewHandlersPropsType>;

export type RegisterMovementComponentPropsType = {
    handleCreateMovement: (data: CreateMovementData) => void,
    actionLoader: boolean
}

export type LastMovementComponentPropsType = {
    loading: boolean,
    data: MovementListItem[]
}