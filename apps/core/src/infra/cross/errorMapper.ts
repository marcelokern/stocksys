import { ErrorList, IErrorList } from "./errorList";

type ErrorData = {
    statusCode: number,
    errorCode: keyof IErrorList;
    errorMessage: string;
}

export interface IErrorMapper {
    getErrorData(): ErrorData;
}

export class ErrorMapper implements IErrorMapper {

    private readonly errorCode: keyof IErrorList;
    private readonly errorMessage: string;
    private readonly errorHTTPStatusCode: number;

    constructor(errorCode?: keyof IErrorList) {

        if (errorCode && ErrorList[errorCode]) {

            this.errorCode = errorCode;
            this.errorMessage = ErrorList[errorCode].errorMessage;
            this.errorHTTPStatusCode = ErrorList[errorCode].errorHTTPStatusCode;

        } else {

            this.errorCode = 'DEFAULT';
            this.errorMessage = ErrorList['DEFAULT'].errorMessage;
            this.errorHTTPStatusCode = ErrorList['DEFAULT'].errorHTTPStatusCode;

        }
    }

    public getErrorData(): ErrorData {
        return { statusCode: this.errorHTTPStatusCode, errorCode: this.errorCode, errorMessage: this.errorMessage };
    }

}