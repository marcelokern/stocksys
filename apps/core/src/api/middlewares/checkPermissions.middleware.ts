import { Request, Response, NextFunction } from "express";
import { UserRole } from "../../domain/models/user.model";
import { ErrorMapper } from "../../infra/cross/errorMapper";

const checkPermissions = (requiredRoles: UserRole[]) => (request: Request, response: Response, next: NextFunction) => {

    try {

        if (requiredRoles.includes(request.user.role)) return next();
        throw new ErrorMapper('FORBIDDEN')

    } catch (error) {

        if (error instanceof ErrorMapper) throw error;
        throw new ErrorMapper('AUTHENTICATION_ERROR');

    }

}

export default checkPermissions;