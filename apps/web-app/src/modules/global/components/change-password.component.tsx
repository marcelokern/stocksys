import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { ChangePasswordComponentPropsType } from "../types/global.types";
import { useGlobal } from "../contexts/global.context";
import { useForm } from "react-hook-form";
import { UpdatePasswordFormSchema, updatePasswordFormSchema } from "@/modules/login/schemas/update-password.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { CircleAlert } from "lucide-react";
import { useLogin } from "@/modules/login/contexts/login.context";

const ChangePassword = ({
    visible,
    closeBottomSheet
}: ChangePasswordComponentPropsType) => {

    const { actionLoader, triggerLoader } = useGlobal();

    const { updatePassword } = useLogin();

    const handleUpdatePassword = async (data: UpdatePasswordFormSchema) => {

        triggerLoader('ACTION', true);
        const actionResult = await updatePassword(data);
        triggerLoader('ACTION', false);
        if (actionResult) closeBottomSheet();

    }

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<UpdatePasswordFormSchema>({
        resolver: zodResolver(updatePasswordFormSchema)
    });

    return (

        <Sheet open={visible} onOpenChange={closeBottomSheet}>

            <SheetContent side={'right'} className="rounded-lg p-16 flex flex-col gap-3">

                <h1 className="text-4xl font-light flex flex-row items-center mb-6">Alterar Senha</h1>

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

            </SheetContent>

        </Sheet>

    );

}

export default ChangePassword;