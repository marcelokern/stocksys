import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert, Loader } from "lucide-react";
import { FormComponentPropsType } from "@/modules/global/types/global.types";
import { useEffect } from "react";
import { CreateSupplierFormSchemaType } from "../types/suppliers.types";
import { createSupplierFormSchema } from "../schemas/suppliers-form.schema";

const SuppplierForm = ({
    visible,
    closeBottomSheet,
    title,
    formLoader,
    formData,
    actionLoader,
    formAction
}: FormComponentPropsType<CreateSupplierFormSchemaType>) => {

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors }
    } = useForm<CreateSupplierFormSchemaType>({
        resolver: zodResolver(createSupplierFormSchema)
    });

    useEffect(() => {
        setValue('cnpj', formData.cnpj);
        setValue('corporateName', formData.corporateName);
        setValue('email', formData.email);
        setValue('phone', formData.phone);
        setValue('zipcode', formData.zipcode);
        setValue('street', formData.street);
        setValue('addressNumber', formData.addressNumber);
        setValue('addressComplement', formData.addressComplement);
        setValue('neighborhood', formData.neighborhood);
        setValue('city', formData.city);
        setValue('uf', formData.uf);
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
                        <Loader className="animate-spin text-primary w-8 h-8" />Obtendo dados do fornecedor...
                    </div>

                ) : (

                    <form onSubmit={handleSubmit((data) => formAction(data))} className='flex flex-col gap-4'>

                        <div className='flex flex-row w-full gap-3'>

                            <div className="flex flex-col w-[20%]">
                                <label className="text-sm mb-2">CNPJ</label>
                                <Input {...register('cnpj')} maxLength={14} onChange={(event) => {
                                    event.target.value = event.target.value.replace(/[^\d]/g, '');
                                }} />
                                {errors.cnpj?.message &&
                                    <span className="w-full text-xs text-red-700 flex flex-row items-center mt-2">
                                        <CircleAlert className="w-4 mr-1" />
                                        {errors.cnpj?.message}
                                    </span>
                                }
                            </div>

                            <div className="flex flex-col w-[40%]">
                                <label className="text-sm mb-2">Razão Social</label>
                                <Input {...register('corporateName')} />
                                {errors.corporateName?.message &&
                                    <span className="w-full text-xs text-red-700 flex flex-row items-center mt-2">
                                        <CircleAlert className="w-4 mr-1" />
                                        {errors.corporateName?.message}
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

                            <div className="flex flex-col w-[20%]">
                                <label className="text-sm mb-2">Telefone</label>
                                <Input {...register('phone')} />
                                {errors.phone?.message &&
                                    <span className="w-full text-xs text-red-700 flex flex-row items-center mt-2">
                                        <CircleAlert className="w-4 mr-1" />
                                        {errors.phone?.message}
                                    </span>
                                }
                            </div>

                        </div>

                        <div className='flex flex-row w-full gap-3'>

                            <div className="flex flex-col w-[10%]">
                                <label className="text-sm mb-2">Cep</label>
                                <Input {...register('zipcode')} />
                                {errors.street?.message &&
                                    <span className="w-full text-xs text-red-700 flex flex-row items-center mt-2">
                                        <CircleAlert className="w-4 mr-1" />
                                        {errors.street?.message}
                                    </span>
                                }
                            </div>

                            <div className="flex flex-col w-[20%]">
                                <label className="text-sm mb-2">Rua</label>
                                <Input {...register('street')} />
                                {errors.street?.message &&
                                    <span className="w-full text-xs text-red-700 flex flex-row items-center mt-2">
                                        <CircleAlert className="w-4 mr-1" />
                                        {errors.street?.message}
                                    </span>
                                }
                            </div>

                            <div className="flex flex-col w-[10%]">
                                <label className="text-sm mb-2">Número</label>
                                <Input {...register('addressNumber')} />
                                {errors.addressNumber?.message &&
                                    <span className="w-full text-xs text-red-700 flex flex-row items-center mt-2">
                                        <CircleAlert className="w-4 mr-1" />
                                        {errors.addressNumber?.message}
                                    </span>
                                }
                            </div>

                            <div className="flex flex-col w-[10%]">
                                <label className="text-sm mb-2">Complemento</label>
                                <Input {...register('addressComplement')} />
                                {errors.addressComplement?.message &&
                                    <span className="w-full text-xs text-red-700 flex flex-row items-center mt-2">
                                        <CircleAlert className="w-4 mr-1" />
                                        {errors.addressComplement?.message}
                                    </span>
                                }
                            </div>

                            <div className="flex flex-col w-[20%]">
                                <label className="text-sm mb-2">Bairro</label>
                                <Input {...register('neighborhood')} />
                                {errors.neighborhood?.message &&
                                    <span className="w-full text-xs text-red-700 flex flex-row items-center mt-2">
                                        <CircleAlert className="w-4 mr-1" />
                                        {errors.neighborhood?.message}
                                    </span>
                                }
                            </div>

                            <div className="flex flex-col w-[25%]">
                                <label className="text-sm mb-2">Cidade</label>
                                <Input {...register('city')} />
                                {errors.city?.message &&
                                    <span className="w-full text-xs text-red-700 flex flex-row items-center mt-2">
                                        <CircleAlert className="w-4 mr-1" />
                                        {errors.city?.message}
                                    </span>
                                }
                            </div>

                            <div className="flex flex-col w-[5%]">
                                <label className="text-sm mb-2">UF</label>
                                <Input {...register('uf')} />
                                {errors.uf?.message &&
                                    <span className="w-full text-xs text-red-700 flex flex-row items-center mt-2">
                                        <CircleAlert className="w-4 mr-1" />
                                        {errors.uf?.message}
                                    </span>
                                }
                            </div>

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