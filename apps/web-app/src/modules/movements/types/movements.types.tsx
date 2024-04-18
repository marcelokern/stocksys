import { ViewPropsType } from "@/modules/global/types/global.types";
import { z } from "zod";
import { createMovementFormSchema } from "../schemas/movements-form.schema";

export type ListMovementType = {
    id: string,
    description: string,
    date: string,
    productCode: string,
    productDescription: string,
    productMeasureUnit: string,
    quantity: number,
    type: string,
    userId: string,
    userName: string,
}

export type CreateMovementType = {
    productId: string;
    description: string;
    date: string;
    quantity: number;
    type: string;
}

export type CreateMovementFormSchemaType = z.infer<typeof createMovementFormSchema>;

export type ListMovementResponseType = ListMovementType[];

export type CreateMovementRequestType = CreateMovementType;

export type MovementsProviderType = {
    movementsList: ListMovementType[],
    listMovements: () => Promise<void>,
    createMovement: (data: CreateMovementType) => Promise<void>,
}

type MovementsViewStatePropsType = {}

type MovementsViewHandlersPropsType = {
    handleCreateMovement: (data: CreateMovementFormSchemaType) => Promise<void>,
}

export type MovementsViewPropsType = ViewPropsType<MovementsViewStatePropsType, MovementsViewHandlersPropsType>;

export type RegisterMovementComponentPropsType = {
    handleCreateMovement: (data: CreateMovementFormSchemaType) => Promise<void>,
    actionLoader: boolean
}

export type LastMovementComponentPropsType = {
    loading: boolean,
    data: ListMovementType[]
}