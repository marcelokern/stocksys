import { container } from "tsyringe";
import { IPrismaService, PrismaService } from "./infra/data/prisma/prisma.service";
import { ISuppliersRepository, SuppliersRepository } from "./infra/repositories/suppliers/suppliers.repository";
import { ISuppliersService, SuppliersService } from "./domain/services/suppliers/suppliers.service";
import { ISuppliersController, SuppliersController } from "./api/controllers/suppliers.controller";

container.registerSingleton<IPrismaService>('PrismaService', PrismaService);
container.registerSingleton<ISuppliersRepository>('SuppliersRepository', SuppliersRepository);
container.registerSingleton<ISuppliersService>('SuppliersService', SuppliersService);
container.registerSingleton<ISuppliersController>('SuppliersController', SuppliersController);