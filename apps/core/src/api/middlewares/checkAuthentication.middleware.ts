import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { ErrorMapper } from "../../infra/cross/errorMapper";

const checkAuthentication = (request: Request, response: Response, next: NextFunction) => {

    if (request.originalUrl === '/auth') return next();

    try {

        const token = request.headers.authorization;
        if (!token) throw new ErrorMapper('UNAUTHORIZED');

        try {

            const secret: string = process.env.SECRET;
            const user = jwt.verify(token, secret);
            request.user = user;

            if (request.originalUrl !== '/auth/update-password' && !user.passwordCreated) throw new ErrorMapper('USER_MUST_CREATE_PASSWORD');

            next();

        } catch (error) {

            if (error instanceof ErrorMapper) throw error;
            throw new ErrorMapper('INVALID_TOKEN');

        }


    } catch (error: any) {

        if (error instanceof ErrorMapper) throw error;
        throw new ErrorMapper('AUTHENTICATION_ERROR');

    }

}

export default checkAuthentication;