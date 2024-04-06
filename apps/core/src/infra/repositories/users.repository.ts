import { inject, injectable } from 'tsyringe';
import { IPrismaService } from '../data/prisma/prisma.service';
import { User } from '../../domain/models/user.model';
import { DataMapper } from '../data/prisma/data.mapper';
import { ErrorMapper } from '../cross/errorMapper';

export interface IUsersRepository {
    getById(id: string): Promise<User>;
    getByEmail(email: string): Promise<User>;
    list(): Promise<User[]>;
    create(user: User): Promise<void>;
    update(id: string, user: User): Promise<void>;
    updatePassword(id: string, password: string): Promise<void>;
    delete(id: string): Promise<void>;
}

@injectable()
export class UsersRepository implements IUsersRepository {

    private readonly prismaService: IPrismaService;

    constructor(@inject('PrismaService') service: IPrismaService) {
        this.prismaService = service;
    }

    async getById(id: string): Promise<User> {

        try {

            const data = await this.prismaService.users.findUniqueOrThrow({ where: { id } })
            return DataMapper.userDataMapper(data);

        } catch (error: any) {

            if (error.code && error.code === 'P2025') throw new ErrorMapper('USER_NOT_FOUND');
            throw new ErrorMapper('USER_GET_ERROR');

        }

    }


    async getByEmail(email: string): Promise<User> {

        try {

            const data = await this.prismaService.users.findUniqueOrThrow({ where: { email } })
            return DataMapper.userDataMapper(data);

        } catch (error: any) {

            if (error.code && error.code === 'P2025') throw new ErrorMapper('USER_NOT_FOUND');
            throw new ErrorMapper('USER_GET_ERROR');

        }

    }

    async list(): Promise<User[]> {

        const data = await this.prismaService.users.findMany();
        return data.map(x => DataMapper.userDataMapper(x));

    }

    async create(user: User): Promise<void> {

        try {

            await this.prismaService.users.create({ data: user })

        } catch (error: any) {

            if (error.code && error.code === 'P2002') throw new ErrorMapper('USER_NOT_UNIQUE');
            throw new ErrorMapper('USER_NOT_CREATED');

        }

    }

    async update(id: string, user: User): Promise<void> {

        try {

            await this.prismaService.users.update({
                data: user,
                select: {
                    registration: true,
                    name: true,
                    email: true,
                    role: true
                },
                where: { id }
            })

        } catch (error: any) {

            if (error.code && error.code === 'P2025') throw new ErrorMapper('USER_NOT_FOUND');
            if (error.code && error.code === 'P2002') throw new ErrorMapper('USER_NOT_UNIQUE');
            throw new ErrorMapper('USER_NOT_UPDATED');

        }

    }

    async updatePassword(id: string, password: string): Promise<void> {

        try {

            await this.prismaService.users.update({
                data: {
                    hashPassword: {
                        set: password
                    },
                    passwordCreated: {
                        set: true
                    }
                },
                where: { id }
            });

        } catch (error: any) {

            if (error.code && error.code === 'P2025') throw new ErrorMapper('USER_NOT_FOUND');
            throw new ErrorMapper('USER_PASSWORD_NOT_UPDATED');

        }

    }

    async delete(id: string): Promise<void> {

        try {

            await this.prismaService.users.delete({ where: { id } });

        } catch (error: any) {

            if (error.code && error.code === 'P2025') throw new ErrorMapper('USER_NOT_FOUND');
            throw new ErrorMapper('USER_NOT_DELETED');

        }

    }

}