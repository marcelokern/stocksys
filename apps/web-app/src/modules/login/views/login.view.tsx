import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginFormSchemaType, loginFormSchema } from "../schemas/login-form.schema";
import { LoginViewPropsType } from "../types/login.types";
import { Toaster } from "@/components/ui/toaster";
import { useGlobal } from "@/modules/global/contexts/global.context";
import { CircleAlert } from "lucide-react";

const LoginView = ({ handlers }: LoginViewPropsType) => {

    const { actionLoader } = useGlobal();

    const { handleLogin } = handlers;

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
            <form onSubmit={handleSubmit(handleLogin)} className="max-w-[350px] w-full flex flex-col items-center gap-5">

                <div className="flex flex-col w-[100%]">
                    <label className="text-sm mb-2">Login</label>
                    <Input {...register('login')} />
                    {errors.login?.message &&
                        <span className="w-full text-xs text-red-700 flex flex-row items-center mt-2">
                            <CircleAlert className="w-4 mr-1" />
                            {errors.login?.message}
                        </span>
                    }
                </div>

                <div className="flex flex-col w-[100%]">
                    <label className="text-sm mb-2">Senha</label>
                    <Input {...register('password')} type="password" />
                    {errors.password?.message &&
                        <span className="w-full text-xs text-red-700 flex flex-row items-center mt-2">
                            <CircleAlert className="w-4 mr-1" />
                            {errors.password?.message}
                        </span>
                    }
                </div>

                <Button loading={actionLoader} className="w-full">Login</Button>

            </form>
        </div>
    );

};

export default LoginView;