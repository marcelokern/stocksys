import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert, Loader } from "lucide-react";
import { FormComponentPropsType } from "@/modules/global/types/global.types";
import { useEffect } from "react";
import { CreateProductFormSchemaType, UpdateProductFormSchemaType } from "../types/products.types";
import { createProductFormSchema, updateProductFormSchema } from "../schemas/products-form.schema";
import { Select, SelectItem, SelectValue, SelectContent, SelectTrigger } from "@/components/ui/select";
import { useSuppliers } from "@/modules/suppliers/contexts/suppliers.context";
import { ListSupplierType } from "@/modules/suppliers/types/suppliers.types";

const ProductsForm = ({
    visible,
    closeBottomSheet,
    title,
    formLoader,
    formData,
    actionLoader,
    formAction,
    type
}: FormComponentPropsType<CreateProductFormSchemaType | UpdateProductFormSchemaType>) => {

    const { suppliersList } = useSuppliers();

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        control,
        formState: { errors }
    } = useForm<CreateProductFormSchemaType | UpdateProductFormSchemaType>({
        resolver: type === 'FORM_EDIT' ? zodResolver(updateProductFormSchema) : zodResolver(createProductFormSchema)
    });

    useEffect(() => {
        setValue('code', formData.code);
        setValue('description', formData.description);
        setValue('measureUnit', formData.measureUnit);
        setValue('address', formData.address);
        setValue('safetyStock', formData.safetyStock);
        setValue('repositionTime', formData.repositionTime);
        setValue('supplierId', formData.supplierId);
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
                        <Loader className="animate-spin text-primary w-8 h-8" />Obtendo dados do produto...
                    </div>

                ) : (

                    <form onSubmit={handleSubmit((data) => formAction(data))} className='flex flex-col gap-4'>

                        <div className='flex flex-row w-full gap-3'>

                            <div className="flex flex-col w-[20%]">
                                <label className="text-sm mb-2">Código</label>
                                <Input {...register('code')} />
                                {errors.code?.message &&
                                    <span className="w-full text-xs text-red-700 flex flex-row items-center mt-2">
                                        <CircleAlert className="w-4 mr-1" />
                                        {errors.code?.message}
                                    </span>
                                }
                            </div>

                            <div className="flex flex-col w-[55%]">
                                <label className="text-sm mb-2">Descrição</label>
                                <Input {...register('description')} />
                                {errors.description?.message &&
                                    <span className="w-full text-xs text-red-700 flex flex-row items-center mt-2">
                                        <CircleAlert className="w-4 mr-1" />
                                        {errors.description?.message}
                                    </span>
                                }
                            </div>

                            <div className="flex flex-col w-[10%]">
                                <label className="text-sm mb-2">Unidade</label>
                                <Input {...register('measureUnit')} />
                                {errors.measureUnit?.message &&
                                    <span className="w-full text-xs text-red-700 flex flex-row items-center mt-2">
                                        <CircleAlert className="w-4 mr-1" />
                                        {errors.measureUnit?.message}
                                    </span>
                                }
                            </div>

                            <div className="flex flex-col w-[15%]">
                                <label className="text-sm mb-2">Endereço</label>
                                <Input {...register('address')} />
                                {errors.address?.message &&
                                    <span className="w-full text-xs text-red-700 flex flex-row items-center mt-2">
                                        <CircleAlert className="w-4 mr-1" />
                                        {errors.address?.message}
                                    </span>
                                }
                            </div>

                        </div>

                        <div className='flex flex-row w-full gap-3'>
                            <Controller
                                name={'supplierId'}
                                control={control}
                                render={({ field }) => (
                                    <div className="flex flex-col w-[60%]">
                                        <label className="text-sm mb-2">Fornecedor</label>
                                        <Select onValueChange={field.onChange} defaultValue={type === 'FORM_EDIT' ? formData.supplierId : ''}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Fornecedor" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {suppliersList.map((x: ListSupplierType) => <SelectItem value={x.id}>{x.corporateName}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                        {errors.supplierId?.message &&
                                            <span className="w-full text-xs text-red-700 flex flex-row items-center mt-2">
                                                <CircleAlert className="w-4 mr-1" />
                                                {errors.supplierId?.message}
                                            </span>
                                        }
                                    </div>
                                )}
                            />

                            <div className="flex flex-col w-[20%]">
                                <label className="text-sm mb-2">Estoque de Segurança</label>
                                <Input {...register('safetyStock')} />
                                {errors.safetyStock?.message &&
                                    <span className="w-full text-xs text-red-700 flex flex-row items-center mt-2">
                                        <CircleAlert className="w-4 mr-1" />
                                        {errors.safetyStock?.message}
                                    </span>
                                }
                            </div>

                            <div className="flex flex-col w-[20%]">
                                <label className="text-sm mb-2">Tempo de Reposição (dias)</label>
                                <Input {...register('repositionTime')} />
                                {errors.repositionTime?.message &&
                                    <span className="w-full text-xs text-red-700 flex flex-row items-center mt-2">
                                        <CircleAlert className="w-4 mr-1" />
                                        {errors.repositionTime?.message}
                                    </span>
                                }
                            </div>

                            {type === 'FORM_CREATE' &&
                                <div className="flex flex-col w-[10%]">
                                    <label className="text-sm mb-2">Balanço Inicial</label>
                                    <Input {...register('balance')} />
                                    {errors.balance?.message &&
                                        <span className="w-full text-xs text-red-700 flex flex-row items-center mt-2">
                                            <CircleAlert className="w-4 mr-1" />
                                            {errors.balance?.message}
                                        </span>
                                    }
                                </div>
                            }

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