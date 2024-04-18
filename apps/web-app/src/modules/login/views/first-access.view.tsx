import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { FirstAccessViewPropsType } from "../types/login.types";
import { Toaster } from "@/components/ui/toaster";
import { useGlobal } from "@/modules/global/contexts/global.context";
import { UpdatePasswordFormSchema, updatePasswordFormSchema } from "../schemas/update-password.schema";
import { CircleAlert } from "lucide-react";

const FirstAccessView = ({ handlers }: FirstAccessViewPropsType) => {

    const { actionLoader } = useGlobal();

    const { handleUpdatePassword } = handlers;

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<UpdatePasswordFormSchema>({
        resolver: zodResolver(updatePasswordFormSchema)
    });

    return (
        <div className="flex flex-col w-full min-h-screen h-full justify-center items-center gap-8">

            <Toaster />

            <h1 className="text-4xl font-semibold">
                stocksys<span className="text-primary">.</span>
            </h1>

            <div className="flex flex-col items-center">
                <span>Para acessar o app pela primeira vez, é necessário criar uma senha.</span>
                <span>Por favor, escolha uma senha forte, 8 dígitos contendo letras e números.</span>
            </div>

            <form onSubmit={handleSubmit(handleUpdatePassword)} className="max-w-[350px] w-full flex flex-col items-center gap-5">

                <div className="flex flex-col w-[100%]">
                    <label className="text-sm mb-2">Senha atual</label>
                    <Input {...register('currentPassword')} type="password" />
                    {errors.currentPassword?.message &&
                        <span className="w-full text-xs text-red-700 flex flex-row items-center mt-2">
                            <CircleAlert className="w-4 mr-1" />
                            {errors.currentPassword?.message}
                        </span>
                    }
                </div>

                <div className="flex flex-col w-[100%]">
                    <label className="text-sm mb-2">Nova senha</label>
                    <Input {...register('newPassword')} type="password" />
                    {errors.newPassword?.message &&
                        <span className="w-full text-xs text-red-700 flex flex-row items-center mt-2">
                            <CircleAlert className="w-4 mr-1" />
                            {errors.newPassword?.message}
                        </span>
                    }
                </div>

                <div className="flex flex-col w-[100%]">
                    <label className="text-sm mb-2">Confirmar senha</label>
                    <Input {...register('confirmPassword')} type="password" />
                    {errors.confirmPassword?.message &&
                        <span className="w-full text-xs text-red-700 flex flex-row items-center mt-2">
                            <CircleAlert className="w-4 mr-1" />
                            {errors.confirmPassword?.message}
                        </span>
                    }
                </div>

                <Button loading={actionLoader} className="w-full">Salvar e continuar</Button>

            </form>

        </div>
    );

};

export default FirstAccessView;