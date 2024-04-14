import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginFormSchemaType, loginFormSchema } from "../schemas/login-form.schema";
import { LoginViewPropsType } from "../types/login.types";
import { Toaster } from "@/components/ui/toaster";
import { useGlobal } from "@/modules/global/contexts/global.context";

const LoginView = ({ handlers }: LoginViewPropsType) => {

    const { actionLoader } = useGlobal();

    const { handleAuthenticate } = handlers;

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginFormSchemaType>({
        resolver: zodResolver(loginFormSchema)
    });

    return (
        <div className="flex flex-col w-full min-h-screen h-full justify-center items-center gap-8">
            <Toaster />
            <h1 className="text-4xl font-semibold">
                stocksys<span className="text-primary">.</span>
            </h1>
            <form onSubmit={handleSubmit(handleAuthenticate)} className="max-w-[350px] w-full flex flex-col items-center gap-5">
                <Input type="text" placeholder="Login" error={errors.login?.message} {...register('login')} />
                <Input type="password" placeholder="Senha" error={errors.password?.message} {...register('password')} />
                <Button loading={actionLoader} className="w-full">Login</Button>
            </form>
        </div>
    );

};

export default LoginView;