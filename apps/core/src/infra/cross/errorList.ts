type ErrorData = {
    errorMessage: string,
    errorHTTPStatusCode: number
}

export type IErrorList = {
    DEFAULT: ErrorData,
    SUPPLIER_LIST_ERROR: ErrorData,
    SUPPLIER_GET_ERROR: ErrorData,
    SUPPLIER_NOT_FOUND: ErrorData,
    SUPPLIER_NOT_CREATED: ErrorData,
    SUPPLIER_NOT_UNIQUE: ErrorData,
    SUPPLIER_NOT_UPDATED: ErrorData,
    SUPPLIER_NOT_DELETED: ErrorData
}

export const ErrorList: IErrorList = {

    DEFAULT: {
        errorMessage: 'Ops, algo deu errado :( Por favor, tente novamente mais tarde.',
        errorHTTPStatusCode: 500
    },
    SUPPLIER_LIST_ERROR: {
        errorMessage: 'Ops, não foi possível listar os fornecedores. :( Por favor, tente novamente mais tarde.',
        errorHTTPStatusCode: 400
    },
    SUPPLIER_GET_ERROR: {
        errorMessage: 'Ops, não foi possível obter os dados deste fornecedor. :( Por favor, tente novamente mais tarde.',
        errorHTTPStatusCode: 400
    },
    SUPPLIER_NOT_FOUND: {
        errorMessage: 'Ops, não foi possível encontrar este fornecedor.',
        errorHTTPStatusCode: 404
    },
    SUPPLIER_NOT_CREATED: {
        errorMessage: 'Ops, não foi possível cadastrar esse fornecedor. :( Por favor, tente novamente mais tarde.',
        errorHTTPStatusCode: 400
    },
    SUPPLIER_NOT_UNIQUE: {
        errorMessage: 'Ops, já existe um fornecedor cadastrado com esse cnpj ou e-mail. Por favor, verifique as informações e tente novamente. ',
        errorHTTPStatusCode: 400
    },
    SUPPLIER_NOT_UPDATED: {
        errorMessage: 'Ops, não foi possível atualizar esse fornecedor. :( Por favor, tente novamente mais tarde.',
        errorHTTPStatusCode: 400
    },
    SUPPLIER_NOT_DELETED: {
        errorMessage: 'Ops, não foi possível remover esse fornecedor. :( Por favor, tente novamente mais tarde.',
        errorHTTPStatusCode: 400
    },

}