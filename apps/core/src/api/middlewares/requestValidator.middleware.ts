import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { ErrorMapper } from '../../infra/cross/errorMapper';

const requestValidator = (schema: AnyZodObject) => async (request: Request, response: Response, next: NextFunction) => {

	try {

		await schema.parseAsync(request);
		return next();

	} catch (error) {

		if (error instanceof ZodError) {
			return response.status(400).send({
				errorCode: 'VALIDATION_ERROR',
				messages: error.issues.map((x) => x.message)
			});
		}

		const defaultError = new ErrorMapper();

		return response
			.status(defaultError.getErrorData().statusCode)
			.send({
				errorCode: defaultError.getErrorData().errorCode,
				message: defaultError.getErrorData().errorMessage
			});

	}

};

export default requestValidator;
