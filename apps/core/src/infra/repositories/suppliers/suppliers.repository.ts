import { inject, injectable } from "tsyringe";
import { ISupplier, Supplier } from "../../../domain/models/supplier/supplier.model";
import { ErrorMapper } from "../../cross/errorMapper";
import { IPrismaService } from "../../data/prisma/prisma.service";

export interface ISuppliersRepository {
    get(id: string): Promise<ISupplier>;
    list(): Promise<ISupplier[]>;
    create(supplier: ISupplier): Promise<void>;
    update(id: string, supplier: ISupplier): Promise<void>;
    delete(id: string): Promise<void>;
}

@injectable()
export class SuppliersRepository implements ISuppliersRepository {

    private readonly prismaService: IPrismaService;

    constructor(@inject('PrismaService') service: IPrismaService) {
        this.prismaService = service
    }

    async get(id: string): Promise<ISupplier> {

        try {

            const supplier = await this.prismaService.suppliers.findUniqueOrThrow({ where: { id } });
            return new Supplier({ ...supplier });

        } catch (error: any) {

            if (error.code && error.code === 'P2025') throw new ErrorMapper('SUPPLIER_NOT_FOUND');
            throw new ErrorMapper('SUPPLIER_GET_ERROR');

        }

    }

    async list(): Promise<ISupplier[]> {

        const suppliers = await this.prismaService.suppliers.findMany();
        return suppliers.map((supplier): ISupplier => new Supplier({ ...supplier }));

    }

    async create(supplier: ISupplier): Promise<void> {

        try {

            await this.prismaService.suppliers.create({ data: { ...supplier } });

        } catch (error: any) {

            if (error.code && error.code === 'P2002') throw new ErrorMapper('SUPPLIER_NOT_UNIQUE');
            throw new ErrorMapper('SUPPLIER_NOT_CREATED');

        }

    }

    async update(id: string, supplier: ISupplier): Promise<void> {

        try {

            await this.prismaService.suppliers.update({ data: { ...supplier }, where: { id } })

        } catch (error: any) {

            if (error.code && error.code === 'P2025') throw new ErrorMapper('SUPPLIER_NOT_FOUND');
            if (error.code && error.code === 'P2002') throw new ErrorMapper('SUPPLIER_NOT_UNIQUE');
            throw new ErrorMapper('SUPPLIER_NOT_UPDATED');

        }

    }

    async delete(id: string): Promise<void> {

        try {

            await this.prismaService.suppliers.delete({ where: { id } });

        } catch (error: any) {

            if (error.code && error.code === 'P2025') throw new ErrorMapper('SUPPLIER_NOT_FOUND');
            throw new ErrorMapper('SUPPLIER_NOT_DELETED');

        }

    }

}