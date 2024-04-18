import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert, Loader } from "lucide-react";
import { FormComponentPropsType } from "@/modules/global/types/global.types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect } from "react";
import { CreateUserFormSchemaType } from "../types/users.types";
import { createUserFormSchema } from "../schemas/users-form.schema";
import { useLogin } from "@/modules/login/contexts/login.context";

const SuppplierForm = ({
    visible,
    closeBottomSheet,
    title,
    formLoader,
    formData,
    actionLoader,
    formAction,
    type
}: FormComponentPropsType<CreateUserFormSchemaType>) => {

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        control,
        formState: { errors }
    } = useForm<CreateUserFormSchemaType>({ resolver: zodResolver(createUserFormSchema) });

    const { getUserInfo } = useLogin();

    const { role } = getUserInfo();

    useEffect(() => {
        setValue('registration', formData.registration);
        setValue('name', formData.name);
        setValue('email', formData.email);
    }, [formData])

    useEffect(() => {
        reset();
    }, [visible])

    return (

        <Sheet open={visible} onOpenChange={closeBottomSheet}>

            <SheetContent side={'bottom'} className="rounded-lg p-16 flex flex-col gap-3">

                <h1 className="text-4xl font-light flex flex-row items-center mb-6">{title}</h1>

                {formLoader ? (

                    <div className="w-full flex flex-row items-center justify-start gap-3">
                        <Loader className="animate-spin text-primary w-8 h-8" />Obtendo dados do usuário...
                    </div>

                ) : (

                    <form onSubmit={handleSubmit((data) => formAction(data))} className='flex flex-col gap-4'>

                        <div className='flex flex-row w-full gap-3'>

                            <div className="flex flex-col w-[20%]">
                                <label className="text-sm mb-2">Matrícula</label>
                                <Input {...register('registration')} />
                                {errors.registration?.message &&
                                    <span className="w-full text-xs text-red-700 flex flex-row items-center mt-2">
                                        <CircleAlert className="w-4 mr-1" />
                                        {errors.registration?.message}
                                    </span>
                                }
                            </div>

                            <div className="flex flex-col w-[40%]">
                                <label className="text-sm mb-2">Nome</label>
                                <Input {...register('name')} />
                                {errors.name?.message &&
                                    <span className="w-full text-xs text-red-700 flex flex-row items-center mt-2">
                                        <CircleAlert className="w-4 mr-1" />
                                        {errors.name?.message}
                                    </span>
                                }
                            </div>

                            <div className="flex flex-col w-[20%]">
                                <label className="text-sm mb-2">E-mail</label>
                                <Input {...register('email')} />
                                {errors.email?.message &&
                                    <span className="w-full text-xs text-red-700 flex flex-row items-center mt-2">
                                        <CircleAlert className="w-4 mr-1" />
                                        {errors.email?.message}
                                    </span>
                                }
                            </div>

                            <Controller
                                name={'role'}
                                control={control}
                                defaultValue={type === 'FORM_EDIT' ? formData.role : 'OPERATOR'}
                                render={({ field }) => (
                                    <div className="flex flex-col w-[20%]">
                                        <label className="text-sm mb-2">Função</label>
                                        <Select onValueChange={field.onChange} defaultValue={type === 'FORM_EDIT' ? formData.role : 'OPERATOR'}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="OPERATOR">Operador de Estoque</SelectItem>
                                                {role === 'ADMIN' && <SelectItem value="MANAGER">Gestor de Estoque</SelectItem>}
                                                {role === 'ADMIN' && <SelectItem value="ADMIN">Administrador</SelectItem>}
                                            </SelectContent>
                                        </Select>
                                        {errors.role?.message &&
                                            <span className="w-full text-xs text-red-700 flex flex-row items-center mt-2">
                                                <CircleAlert className="w-4 mr-1" />
                                                {errors.role?.message}
                                            </span>
                                        }
                                    </div>
                                )}
                            />
                        </div>

                        <div className='flex flex-row gap-3 mt-6'>
                            <Button loading={actionLoader}>Salvar</Button>
                        </div>

                    </form>

                )}

            </SheetContent>

        </Sheet>

    );

}

export default SuppplierForm;