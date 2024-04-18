import requester from "@/lib/requester";
import { DefaultResponseType } from "@/modules/global/types/global.types";
import { CreateMovementRequestType, ListMovementResponseType } from "../types/movements.types";

const movementsService = {

    listMovements: async () =>
        await requester<undefined, ListMovementResponseType>('GET', '/movements/last'),

    createMovement: async (data: CreateMovementRequestType) =>
        await requester<CreateMovementRequestType, DefaultResponseType>('POST', '/movements', data),

}

export default movementsService;