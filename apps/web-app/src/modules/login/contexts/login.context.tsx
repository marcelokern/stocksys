import { ContextProviderProps } from "@/modules/global/types/global.types";
import { createContext, useContext, useState } from "react";
import { LoginProviderType } from "../types/login.types";
import loginService from "../services/login.service";
import { errorHandler } from "@/lib/error-handler";
import { LoginFormSchemaType } from "../schemas/login-form.schema";
import { UpdatePasswordFormSchema } from "../schemas/update-password.schema";
import { NavigateFunction } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

const LoginProviderContext = createContext<LoginProviderType>({} as LoginProviderType)

export function LoginProvider({ children }: ContextProviderProps) {

    const [userEmail, setUserEmail] = useState<string>('');

    const login = async (data: LoginFormSchemaType) => {

        try {

            const response = await loginService.login(data);
            setUserEmail(data.login);
            localStorage.setItem('@stocksys-token', response.token);
            const { passwordCreated, role } = getUserInfo();
            return { login: true, passwordCreated, navigate: role === 'OPERATOR' ? '/movimentacoes' : '/produtos' };

        } catch (error: any) {

            errorHandler(error);
            return { login: false };

        }

    }

    const updatePasswordFirstAccess = async (data: UpdatePasswordFormSchema) => {

        try {

            await loginService.updatePassword({ currentPassword: data.currentPassword, newPassword: data.newPassword });
            await login({ login: userEmail, password: data.newPassword });
            const { role } = getUserInfo();
            if (!role) return false;
            return { login: true, navigate: role === 'OPERATOR' ? '/movimentacoes' : '/produtos' };

        } catch (error: any) {

            errorHandler(error);
            return false;

        }

    }

    const updatePassword = async (data: UpdatePasswordFormSchema) => {

        try {

            const response = await loginService.updatePassword({ currentPassword: data.currentPassword, newPassword: data.newPassword });
            toast({
                description: response.message,
                variant: 'success'
            })
            return true;

        } catch (error: any) {

            errorHandler(error);
            return false;

        }

    }

    const getUserInfo = () => {

        const token = localStorage.getItem('@stocksys-token');
        return JSON.parse(atob(token.split('.')[1]));

    }

    const logout = (navigate: NavigateFunction) => {

        localStorage.removeItem("@stocksys-token");
        navigate('/login');

    }

    const value = {
        login,
        updatePasswordFirstAccess,
        updatePassword,
        getUserInfo,
        logout
    }

    return (
        <LoginProviderContext.Provider value={value}>
            {children}
        </LoginProviderContext.Provider>
    )

}

export const useLogin = () => {

    return useContext(LoginProviderContext);

}