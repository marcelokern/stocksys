import { User } from '../../domain/models/user.model';
import { CreateUserDto, GetUserDto } from '../dtos/users.dto';

export class UserDtoMapper {

    public static getUserDtoMapper(user: User): GetUserDto {

        const dto = new GetUserDto();
        dto.id = user.id;
        dto.registration = user.registration;
        dto.name = user.name;
        dto.email = user.email;
        dto.role = user.role;
        dto.passwordCreated = user.passwordCreated;

        return dto;

    }

    public static createUserDtoMapper(dto: CreateUserDto): User {

        const user = new User();
        user.registration = dto.registration;
        user.name = dto.name;
        user.email = dto.email;
        user.role = dto.role;

        return user;

    }

    public static updateUserDtoMapper(dto: CreateUserDto, id: string): User {

        const user = new User();
        user.id = id;
        user.registration = dto.registration;
        user.name = dto.name;
        user.email = dto.email;
        user.role = dto.role;

        return user;

    }

}
