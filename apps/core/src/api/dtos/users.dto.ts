import { UserRole } from "../../domain/models/user.model";

export class GetUserDto {
    public id: string;
    public registration: string;
    public name: string;
    public email: string;
    public role: UserRole;
    public passwordCreated: boolean;
}

export class CreateUserDto {
    public registration: string;
    public name: string;
    public email: string;
    public role: UserRole;
}