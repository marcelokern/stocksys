import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Controller, useForm } from "react-hook-form";
import { UserFormSchemaType, userFormSchema } from "../schemas/users-form.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { FormComponentPropsType } from "@/modules/global/types/global.types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SuppplierForm = ({
    visible,
    closeBottomSheet,
    title,
    formLoader,
    formData,
    actionLoader,
    formAction
}: FormComponentPropsType<UserFormSchemaType>) => {

    const {
        register,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm<UserFormSchemaType>({ resolver: zodResolver(userFormSchema) });

    return (

        <Sheet open={visible} onOpenChange={closeBottomSheet}>

            <SheetContent side={'bottom'} className="rounded-lg p-16 flex flex-col gap-3">

                <h1 className="text-4xl font-light flex flex-row items-center mb-6">{title}</h1>

                {formLoader ? (

                    <div className="w-full flex flex-row items-center justify-start gap-3">
                        <Loader className="animate-spin text-primary w-8 h-8" />Obtendo dados do usuário...
                    </div>

                ) : (

                    <form onSubmit={handleSubmit((data) => formAction(data))} className='flex flex-col gap-3'>
                        <div className='flex flex-row w-full gap-3'>
                            <Input placeholder='Matrícula' className='w-[20%]' {...register('registration')} error={errors.registration?.message} />
                            <Input placeholder='Nome' className='w-[40%]' {...register('name')} error={errors.name?.message} />
                            <Input placeholder='E-mail' className='w-[20%]' {...register('email')} error={errors.email?.message} />
                            <Controller
                                name={'role'}
                                control={control}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange}>
                                        <SelectTrigger className="w-[20%]">
                                            <SelectValue placeholder="Função" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="OPERATOR">Operador de Estoque</SelectItem>
                                            <SelectItem value="MANAGER">Gestor de Estoque</SelectItem>
                                            <SelectItem value="ADMIN">Administrador</SelectItem>
                                        </SelectContent>
                                    </Select>
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