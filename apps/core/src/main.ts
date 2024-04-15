import 'reflect-metadata';
import './dependencies.container';
import express from 'express';
import checkAuthentication from './api/middlewares/checkAuthentication.middleware';
import authenticationRouter from './api/router/authentication.router';
import suppliersRouter from './api/router/suppliers.router';
import productsRouter from './api/router/products.router';
import movementsRouter from './api/router/movements.router';
import ordersRouter from './api/router/orders.router';
import reportsRouter from './api/router/reports.router';
import errorHandler from './api/middlewares/errorHandler.middleware';
import usersRouter from './api/router/users.router';
import cors from 'cors';

express()
	.use(cors())
	.use(express.json())
	.use(checkAuthentication)
	.use(authenticationRouter)
	.use(usersRouter)
	.use(suppliersRouter)
	.use(productsRouter)
	.use(movementsRouter)
	.use(ordersRouter)
	.use(reportsRouter)
	.use(errorHandler)
	.listen(3000, () => { console.log('===> STOCKSYS API STARTED'); });
