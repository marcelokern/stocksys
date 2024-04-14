import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useForm } from "react-hook-form";
import { SupplierFormSchemaType, supplierFormSchema } from "../schemas/suppliers-form.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { FormComponentPropsType } from "@/modules/global/types/global.types";

const SuppplierForm = ({
    visible,
    closeBottomSheet,
    title,
    formLoader,
    formData,
    actionLoader,
    formAction
}: FormComponentPropsType<SupplierFormSchemaType>) => {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<SupplierFormSchemaType>({ resolver: zodResolver(supplierFormSchema) });

    return (

        <Sheet open={visible} onOpenChange={closeBottomSheet}>

            <SheetContent side={'bottom'} className="rounded-lg p-16 flex flex-col gap-3">

                <h1 className="text-4xl font-light flex flex-row items-center mb-6">{title}</h1>

                {formLoader ? (

                    <div className="w-full flex flex-row items-center justify-start gap-3">
                        <Loader className="animate-spin text-primary w-8 h-8" />Obtendo dados do fornecedor...
                    </div>

                ) : (

                    <form onSubmit={handleSubmit((data) => formAction(data))} className='flex flex-col gap-3'>
                        <div className='flex flex-row w-full gap-3'>
                            <Input placeholder='CNPJ' className='w-[20%]' {...register('cnpj')} error={errors.cnpj?.message} />
                            <Input placeholder='Razão Social' className='w-[40%]' {...register('corporateName')} error={errors.corporateName?.message} />
                            <Input placeholder='E-mail' className='w-[20%]' {...register('email')} error={errors.email?.message} />
                            <Input placeholder='Telefone' className='w-[20%]' {...register('phone')} error={errors.phone?.message} />
                        </div>
                        <div className='flex flex-row w-full gap-3'>
                            <Input placeholder='Rua' className='w-[25%]' {...register('street')} error={errors.street?.message} />
                            <Input placeholder='Número' className='w-[10%]' {...register('addressNumber')} error={errors.addressNumber?.message} />
                            <Input placeholder='Complemento' className='w-[10%]'{...register('addressComplement')} error={errors.addressComplement?.message} />
                            <Input placeholder='Bairro' className='w-[25%]' {...register('neighborhood')} error={errors.neighborhood?.message} />
                            <Input placeholder='Cidade' className='w-[25%]' {...register('city')} error={errors.city?.message} />
                            <Input placeholder='UF' className='w-[5%]' {...register('uf')} error={errors.uf?.message} />
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