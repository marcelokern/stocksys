import 'reflect-metadata';
import './dependencies.container';
import express from 'express';
import errorHandlerr from './api/middlewares/errorHandler.middleware';
import suppliersRouter from './api/router/suppliers.router';
import productsRouter from './api/router/products.router';
import movementsRouter from './api/router/movements.router';
import ordersRouter from './api/router/orders.router';

express()
	.use(express.json())
	.use(suppliersRouter)
	.use(productsRouter)
	.use(movementsRouter)
	.use(ordersRouter)
	.use(errorHandlerr)
	.listen(3000, () => console.log('===> STOCKSYS API STARTED'));
