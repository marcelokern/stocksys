import { randomUUID } from "crypto";

export enum UserRole {
    OPERATOR = 'OPERATOR',
    MANAGER = 'MANAGER',
    ADMIN = 'ADMIN'
}

export class User {
    public id: string;
    public registration: string;
    public name: string;
    public email: string;
    public role: UserRole;
    public passwordCreated: boolean;
    public hashPassword: string;

    constructor(id?: string) {
        this.id = id || randomUUID();
        this.passwordCreated = false;
    }
}