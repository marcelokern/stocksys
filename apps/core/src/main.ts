import 'reflect-metadata';
import './dependencies.container';
import express from "express";
import suppliersRouter from "./api/router/suppliers.router";
import ErrorHandlerr from "./api/middlewares/errorHandler.middleware";

express()
    .use(express.json())
    .use(suppliersRouter)
    .use(ErrorHandlerr)
    .listen(3000, () => console.log("Stocksys API started!"));
