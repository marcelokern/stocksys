import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../../infra/repositories/users.repository';
import { User, UserRole } from '../models/user.model';
import { ErrorMapper } from '../../infra/cross/errorMapper';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';

export interface IUsersService {
    authenticate(login: string, password: string): Promise<string>;
    getUser(id: string): Promise<User>;
    listUsers(): Promise<User[]>;
    createUser(user: User, currentUserRole: UserRole): Promise<{ temporaryPassword: string }>;
    updateUser(id: string, user: User, currentUserRole: UserRole): Promise<void>;
    updateUserPassword(id: string, currentPassword: string, newPassword: string): Promise<void>;
    deleteUser(id: string, currentUserRole: UserRole): Promise<void>;
}

@injectable()
export class UsersService implements IUsersService {

    private readonly usersRepository: IUsersRepository;

    constructor(@inject('UsersRepository') usersRepository: IUsersRepository) {
        this.usersRepository = usersRepository;
    }

    async authenticate(login: string, password: string): Promise<string> {

        try {

            const user: User = await this.usersRepository.getByEmail(login);

            if (await bcrypt.compare(password, user.hashPassword)) {

                const secret: string = process.env.SECRET;
                return jwt.sign({ id: user.id, role: user.role, passwordCreated: user.passwordCreated }, secret, { expiresIn: "8h" });

            }

            throw new ErrorMapper('INVALID_PASSWORD');

        } catch (error: any) {

            if (error instanceof ErrorMapper) throw error;
            throw new ErrorMapper('AUTHENTICATION_ERROR');

        }

    };

    async updateUserPassword(id: string, currentPassword: string, newPassword: string): Promise<void> {

        try {

            const user: User = await this.usersRepository.getById(id);

            if (await bcrypt.compare(currentPassword, user.hashPassword)) {

                const hashPassword = await bcrypt.hash(newPassword, 10);
                await this.usersRepository.updatePassword(id, hashPassword);

            } else {

                throw new ErrorMapper('INVALID_PASSWORD');

            }

        } catch (error: any) {

            if (error instanceof ErrorMapper) throw error;
            throw new ErrorMapper('USER_PASSWORD_NOT_UPDATED');

        }

    }

    async getUser(id: string): Promise<User> {

        try {

            return await this.usersRepository.getById(id);

        } catch (error: any) {

            if (error instanceof ErrorMapper) throw error;
            throw new ErrorMapper('USER_GET_ERROR');

        }

    }

    async listUsers(): Promise<User[]> {

        try {

            return await this.usersRepository.list();

        } catch (error: any) {

            throw new ErrorMapper('USER_LIST_ERROR');

        }

    }

    async createUser(user: User, currentUserRole: UserRole): Promise<{ temporaryPassword: string }> {

        try {

            if (currentUserRole === UserRole.MANAGER && user.role !== UserRole.OPERATOR) throw new ErrorMapper('USER_CREATE_PERMISSION_ERROR');

            const temporaryPassword = randomUUID().substring(0, 8);
            user.hashPassword = await bcrypt.hash(temporaryPassword, 10);
            await this.usersRepository.create(user);
            return { temporaryPassword };

        } catch (error: any) {

            if (error instanceof ErrorMapper) throw error;
            throw new ErrorMapper('USER_NOT_CREATED');

        }

    }

    async updateUser(id: string, user: User, currentUserRole: UserRole): Promise<void> {

        try {

            const userData: User = await this.usersRepository.getById(id);
            if (currentUserRole === UserRole.MANAGER && userData.role !== UserRole.OPERATOR) throw new ErrorMapper('USER_UPDATE_PERMISSION_ERROR');

            await this.usersRepository.update(id, user);

        } catch (error: any) {

            if (error instanceof ErrorMapper) throw error;
            throw new ErrorMapper('USER_NOT_UPDATED');

        }

    }

    async deleteUser(id: string, currentUserRole: UserRole): Promise<void> {

        try {

            const user: User = await this.usersRepository.getById(id);
            if (currentUserRole === UserRole.MANAGER && user.role !== UserRole.OPERATOR) throw new ErrorMapper('USER_DELETE_PERMISSION_ERROR');

            await this.usersRepository.delete(id);

        } catch (error: any) {

            if (error instanceof ErrorMapper) throw error;
            throw new ErrorMapper('USER_NOT_DELETED');

        }

    }

}
