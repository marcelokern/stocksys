type ErrorData = {
	errorMessage: string;
	errorHTTPStatusCode: number;
};

export type IErrorList = {
	DEFAULT: ErrorData;
	SUPPLIER_LIST_ERROR: ErrorData;
	SUPPLIER_GET_ERROR: ErrorData;
	SUPPLIER_NOT_FOUND: ErrorData;
	SUPPLIER_NOT_CREATED: ErrorData;
	SUPPLIER_NOT_UNIQUE: ErrorData;
	SUPPLIER_NOT_UPDATED: ErrorData;
	SUPPLIER_NOT_DELETED: ErrorData;
	SUPPLIER_HAS_PRODUCTS: ErrorData;
	PRODUCT_LIST_ERROR: ErrorData;
	PRODUCT_GET_ERROR: ErrorData;
	PRODUCT_NOT_FOUND: ErrorData;
	PRODUCT_NOT_CREATED: ErrorData;
	PRODUCT_NOT_UNIQUE: ErrorData;
	PRODUCT_NOT_UPDATED: ErrorData;
	PRODUCT_BALANCE_NOT_UPDATED: ErrorData;
	PRODUCT_NOT_DELETED: ErrorData;
	PRODUCT_HAS_MOVEMENTS: ErrorData;
	MOVEMENT_LIST_ERROR: ErrorData;
	MOVEMENT_NOT_CREATED: ErrorData;
	ORDER_LIST_ERROR: ErrorData;
	ORDER_GET_ERROR: ErrorData;
	ORDER_NOT_FOUND: ErrorData;
	ORDER_NOT_CREATED: ErrorData;
	ORDER_ITEMS_NOT_UNIQUE: ErrorData;
	ORDER_STATUS_NOT_UPDATED: ErrorData;
	ORDER_STATUS_BLOCKED: ErrorData;
	REPORT_ERROR: ErrorData;
};

export const ErrorList: IErrorList = {
	DEFAULT: {
		errorMessage: 'Ops, algo deu errado :( Por favor, tente novamente mais tarde.',
		errorHTTPStatusCode: 500,
	},
	SUPPLIER_LIST_ERROR: {
		errorMessage: 'Ops, não foi possível listar os fornecedores. :( Por favor, tente novamente mais tarde.',
		errorHTTPStatusCode: 400,
	},
	SUPPLIER_GET_ERROR: {
		errorMessage: 'Ops, não foi possível obter os dados deste fornecedor. :( Por favor, tente novamente mais tarde.',
		errorHTTPStatusCode: 400,
	},
	SUPPLIER_NOT_FOUND: {
		errorMessage: 'Ops, não foi possível encontrar este fornecedor.',
		errorHTTPStatusCode: 404,
	},
	SUPPLIER_NOT_CREATED: {
		errorMessage: 'Ops, não foi possível cadastrar esse fornecedor. :( Por favor, tente novamente mais tarde.',
		errorHTTPStatusCode: 400,
	},
	SUPPLIER_NOT_UNIQUE: {
		errorMessage: 'Ops, já existe um fornecedor cadastrado com esse cnpj ou e-mail. Por favor, verifique as informações e tente novamente. ',
		errorHTTPStatusCode: 400,
	},
	SUPPLIER_NOT_UPDATED: {
		errorMessage: 'Ops, não foi possível atualizar esse fornecedor. :( Por favor, tente novamente mais tarde.',
		errorHTTPStatusCode: 400,
	},
	SUPPLIER_NOT_DELETED: {
		errorMessage: 'Ops, não foi possível remover esse fornecedor. :( Por favor, tente novamente mais tarde.',
		errorHTTPStatusCode: 400,
	},
	SUPPLIER_HAS_PRODUCTS: {
		errorMessage: 'Ops, não foi possível remover pois existem produtos associados a este fornecedor.',
		errorHTTPStatusCode: 400,
	},
	PRODUCT_LIST_ERROR: {
		errorMessage: 'Ops, não foi possível listar os produtos. :( Por favor, tente novamente mais tarde.',
		errorHTTPStatusCode: 400,
	},
	PRODUCT_GET_ERROR: {
		errorMessage: 'Ops, não foi possível obter os dados deste produto. :( Por favor, tente novamente mais tarde.',
		errorHTTPStatusCode: 400,
	},
	PRODUCT_NOT_FOUND: {
		errorMessage: 'Ops, não foi possível encontrar este produto.',
		errorHTTPStatusCode: 404,
	},
	PRODUCT_NOT_CREATED: {
		errorMessage: 'Ops, não foi possível cadastrar esse produto. :( Por favor, tente novamente mais tarde.',
		errorHTTPStatusCode: 400,
	},
	PRODUCT_NOT_UNIQUE: {
		errorMessage: 'Ops, já existe um produto cadastrado com esse código. Por favor, verifique as informações e tente novamente. ',
		errorHTTPStatusCode: 400,
	},
	PRODUCT_NOT_UPDATED: {
		errorMessage: 'Ops, não foi possível atualizar esse produto. :( Por favor, tente novamente mais tarde.',
		errorHTTPStatusCode: 400,
	},
	PRODUCT_BALANCE_NOT_UPDATED: {
		errorMessage: 'Ops, não foi possível atualizar o saldo deste produto. :( Por favor, tente novamente mais tarde.',
		errorHTTPStatusCode: 400,
	},
	PRODUCT_NOT_DELETED: {
		errorMessage: 'Ops, não foi possível remover esse produto. :( Por favor, tente novamente mais tarde.',
		errorHTTPStatusCode: 400,
	},
	PRODUCT_HAS_MOVEMENTS: {
		errorMessage: 'Ops, não foi possível remover pois existem movimentações associadas a este produto.',
		errorHTTPStatusCode: 400,
	},
	MOVEMENT_LIST_ERROR: {
		errorMessage: 'Ops, não foi possível listar as movimentações. :( Por favor, tente novamente mais tarde.',
		errorHTTPStatusCode: 400,
	},
	MOVEMENT_NOT_CREATED: {
		errorMessage: 'Ops, não foi possível registrar essa movimentação. :( Por favor, tente novamente mais tarde.',
		errorHTTPStatusCode: 400,
	},
	ORDER_LIST_ERROR: {
		errorMessage: 'Ops, não foi possível listar os pedidos. :( Por favor, tente novamente mais tarde.',
		errorHTTPStatusCode: 400,
	},
	ORDER_GET_ERROR: {
		errorMessage: 'Ops, não foi possível obter os detalhes deste pedido. :( Por favor, tente novamente mais tarde.',
		errorHTTPStatusCode: 400,
	},
	ORDER_NOT_FOUND: {
		errorMessage: 'Ops, não foi possível encontrar este pedido.',
		errorHTTPStatusCode: 404,
	},
	ORDER_NOT_CREATED: {
		errorMessage: 'Ops, não foi possível criar esse pedido. :( Por favor, tente novamente mais tarde.',
		errorHTTPStatusCode: 400,
	},
	ORDER_ITEMS_NOT_UNIQUE: {
		errorMessage: 'Ops, não é possível inserir o mesmo produto mais de uma vez no mesmo pedido.',
		errorHTTPStatusCode: 400,
	},
	ORDER_STATUS_NOT_UPDATED: {
		errorMessage: 'Ops, não foi possível atualizar o status deste pedido. :( Por favor, tente novamente mais tarde.',
		errorHTTPStatusCode: 400,
	},
	ORDER_STATUS_BLOCKED: {
		errorMessage: 'Ops, não é possível atualizar o status de um pedido cancelado ou finalizado.',
		errorHTTPStatusCode: 400,
	},
	REPORT_ERROR: {
		errorMessage: 'Ops, não é possível gerar o relatório com os parâmetros informados.',
		errorHTTPStatusCode: 400,
	}
};
