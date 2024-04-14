import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { FirstAccessViewPropsType } from "../types/login.types";
import { Toaster } from "@/components/ui/toaster";
import { useGlobal } from "@/modules/global/contexts/global.context";
import { SetPasswordFormSchema, setPasswordFormSchema } from "../schemas/set-password.schema";

const FirstAccessView = ({ handlers }: FirstAccessViewPropsType) => {

    const { actionLoader } = useGlobal();

    const { handleSetPassword } = handlers;

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<SetPasswordFormSchema>({
        resolver: zodResolver(setPasswordFormSchema)
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
            <form onSubmit={handleSubmit(handleSetPassword)} className="max-w-[350px] w-full flex flex-col items-center gap-5">
                <Input type="password" placeholder="Senha atual" error={errors.currentPassword?.message} {...register('currentPassword')} />
                <Input type="password" placeholder="Nova senha" error={errors.newPassword?.message} {...register('newPassword')} />
                <Input type="password" placeholder="Confirmar senha" error={errors.confirmPassword?.message} {...register('confirmPassword')} />
                <Button loading={actionLoader} className="w-full">Salvar e continuar</Button>
            </form>
        </div>
    );

};

export default FirstAccessView;