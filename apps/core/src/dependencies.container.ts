import { container } from 'tsyringe';
import { IPrismaService, PrismaService } from './infra/data/prisma/prisma.service';
import { ISuppliersRepository, SuppliersRepository } from './infra/repositories/suppliers.repository';
import { ISuppliersService, SuppliersService } from './domain/services/suppliers.service';
import { ISuppliersController, SuppliersController } from './api/controllers/suppliers.controller';
import { IProductsRepository, ProductsRepository } from './infra/repositories/products.repository';
import { IProductsService, ProductsService } from './domain/services/products.service';
import { IProductsController, ProductsController } from './api/controllers/products.controller';
import { IMovementsRepository, MovementsRepository } from './infra/repositories/movements.repository';
import { IMovementsService, MovementsService } from './domain/services/movements.service';
import { IMovementsController, MovementsController } from './api/controllers/movements.controller';
import { IOrdersRepository, OrdersRepository } from './infra/repositories/orders.repository';
import { IOrdersService, OrdersService } from './domain/services/orders.service';
import { IOrdersController, OrdersController } from './api/controllers/orders.controller';

container.registerSingleton<IPrismaService>('PrismaService', PrismaService);

container.registerSingleton<ISuppliersRepository>('SuppliersRepository', SuppliersRepository);
container.registerSingleton<ISuppliersService>('SuppliersService', SuppliersService);
container.registerSingleton<ISuppliersController>('SuppliersController', SuppliersController);

container.registerSingleton<IProductsRepository>('ProductsRepository', ProductsRepository);
container.registerSingleton<IProductsService>('ProductsService', ProductsService);
container.registerSingleton<IProductsController>('ProductsController', ProductsController);

container.registerSingleton<IMovementsRepository>('MovementsRepository', MovementsRepository);
container.registerSingleton<IMovementsService>('MovementsService', MovementsService);
container.registerSingleton<IMovementsController>('MovementsController', MovementsController);

container.registerSingleton<IOrdersRepository>('OrdersRepository', OrdersRepository);
container.registerSingleton<IOrdersService>('OrdersService', OrdersService);
container.registerSingleton<IOrdersController>('OrdersController', OrdersController);
