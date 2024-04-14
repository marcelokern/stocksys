import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useForm } from "react-hook-form";
import { ProductFormSchemaType, productFormSchema } from "../schemas/products-form.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { FormComponentPropsType } from "@/modules/global/types/global.types";

const ProductsForm = ({
    visible,
    closeBottomSheet,
    title,
    formLoader,
    formData,
    actionLoader,
    formAction
}: FormComponentPropsType<ProductFormSchemaType>) => {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<ProductFormSchemaType>({ resolver: zodResolver(productFormSchema) });

    return (

        <Sheet open={visible} onOpenChange={closeBottomSheet}>

            <SheetContent side={'bottom'} className="rounded-lg p-16 flex flex-col gap-3">

                <h1 className="text-4xl font-light flex flex-row items-center mb-6">{title}</h1>

                {formLoader ? (

                    <div className="w-full flex flex-row items-center justify-start gap-3">
                        <Loader className="animate-spin text-primary w-8 h-8" />Obtendo dados do produto...
                    </div>

                ) : (

                    <form onSubmit={handleSubmit((data) => formAction(data))} className='flex flex-col gap-3'>
                        <div className='flex flex-row w-full gap-3'>
                            <Input placeholder='Código' className='w-[20%]' error={errors.code?.message} {...register('code')} />
                            <Input placeholder='Descrição' className='w-[55%]' error={errors.description?.message} {...register('description')} />
                            <Input placeholder='Unidade' className='w-[10%]' error={errors.measureUnit?.message} {...register('measureUnit')} />
                            <Input placeholder='Endereço' className='w-[15%]' error={errors.address?.message} {...register('address')} />
                        </div>
                        <div className='flex flex-row w-full gap-3'>
                            <Input placeholder='Fornecedor' className='w-[55%]' error={errors.supplierId?.message} {...register('supplierId')} />
                            <Input placeholder='Estoque de Segurança' className='w-[15%]' error={errors.safetyStock?.message} {...register('safetyStock')} />
                            <Input placeholder='Tempo de Reposição' className='w-[15%]' error={errors.repositionTime?.message} {...register('repositionTime')} />
                            <Input placeholder='Balanço Inicial' className='w-[15%]' error={errors.balance?.message} {...register('balance')} />
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

export default ProductsForm;