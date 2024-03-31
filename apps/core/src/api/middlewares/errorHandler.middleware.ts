import { NextFunction, Request, Response } from 'express';
import { ErrorMapper, IErrorMapper } from '../../infra/cross/errorMapper';

const errorHandlerr = (error: any, request: Request, response: Response, next: NextFunction) => {
	
	const errorMap: IErrorMapper = error instanceof ErrorMapper ? error : new ErrorMapper('DEFAULT');

	return response
		.status(errorMap.getErrorData().statusCode)
		.send({ 
			errorCode: errorMap.getErrorData().errorCode,
			message: errorMap.getErrorData().errorMessage
		});

};

export default errorHandlerr;
