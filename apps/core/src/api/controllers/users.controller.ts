import { inject, injectable } from 'tsyringe';
import { Request, Response, NextFunction } from 'express';
import { IUsersService } from '../../domain/services/users.service';
import { User } from '../../domain/models/user.model';
import { CreateUserDto, GetUserDto } from '../dtos/users.dto';
import { UserDtoMapper } from '../mappers/usersDto.mapper';
import { UsersListParametersType } from '../../infra/cross/filterParamsTypes';

export interface IUsersController {
    authenticate(request: Request, response: Response, next: NextFunction): Promise<Response | void>;
    updateUserPassword(request: Request, response: Response, next: NextFunction): Promise<Response | void>;
    getUser(request: Request, response: Response, next: NextFunction): Promise<Response | void>;
    listUsers(request: Request, response: Response, next: NextFunction): Promise<Response | void>;
    createUser(request: Request, response: Response, next: NextFunction): Promise<Response | void>;
    updateUser(request: Request, response: Response, next: NextFunction): Promise<Response | void>;
    deleteUser(request: Request, response: Response, next: NextFunction): Promise<Response | void>;
}

@injectable()
export class UsersController implements IUsersController {

    private readonly usersService: IUsersService;

    constructor(@inject('UsersService') service: IUsersService) {
        this.usersService = service;
    }

    async authenticate(request: Request, response: Response, next: NextFunction): Promise<Response | void> {

        try {

            const { login, password } = request.body;
            const authentication = await this.usersService.authenticate(login, password);
            return response.send({ token: authentication });

        } catch (error: any) {

            return next(error);

        }

    }

    async updateUserPassword(request: Request, response: Response, next: NextFunction): Promise<Response | void> {

        try {

            const userId = request.user.id;
            const { currentPassword, newPassword } = request.body;
            await this.usersService.updateUserPassword(userId, currentPassword, newPassword);
            return response.send({ message: 'Senha atualizada com sucesso!' });

        } catch (error: any) {

            return next(error);

        }

    }

    async listUsers(request: Request, response: Response, next: NextFunction): Promise<Response | void> {

        try {

            const parameters: UsersListParametersType = request.query as UsersListParametersType;
            const users: User[] = await this.usersService.listUsers(parameters);
            const listUsersDto: GetUserDto[] = users.map(user => UserDtoMapper.getUserDtoMapper(user));
            return response.send(listUsersDto);

        } catch (error: any) {

            return next(error);

        }
    }

    async getUser(request: Request, response: Response, next: NextFunction): Promise<Response | void> {

        try {

            const { id } = request.params;
            const user: User = await this.usersService.getUser(id);
            const getUserDto: GetUserDto = UserDtoMapper.getUserDtoMapper(user);
            return response.send(getUserDto);

        } catch (error: any) {

            return next(error);

        }
    }

    async createUser(request: Request, response: Response, next: NextFunction): Promise<Response | void> {

        try {

            const currentUserRole = request.user.role;

            const dto: CreateUserDto = request.body;
            const user: User = UserDtoMapper.createUserDtoMapper(dto);
            const createUser = await this.usersService.createUser(user, currentUserRole);
            return response.send({
                message: 'Usuário criado com sucesso! A senha temporária deverá ser alterada no primeiro acesso.',
                temporaryPassword: createUser.temporaryPassword
            });

        } catch (error: any) {

            return next(error);

        }
    }

    async updateUser(request: Request, response: Response, next: NextFunction): Promise<Response | void> {

        try {

            const currentUserRole = request.user.role;

            const { id } = request.params;
            const dto: CreateUserDto = request.body;
            const user: User = UserDtoMapper.updateUserDtoMapper(dto, id);
            await this.usersService.updateUser(id, user, currentUserRole);
            return response.send({ message: 'Usuário atualizado com sucesso!' });

        } catch (error: any) {

            return next(error);

        }
    }

    async deleteUser(request: Request, response: Response, next: NextFunction): Promise<Response | void> {

        try {

            const currentUserRole = request.user.role;

            const { id } = request.params;
            await this.usersService.deleteUser(id, currentUserRole);
            return response.send({ message: 'Usuário removido com sucesso!' });

        } catch (error: any) {

            return next(error);

        }
    }

}
