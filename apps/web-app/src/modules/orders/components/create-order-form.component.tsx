import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert, CircleFadingPlus, Loader, X } from "lucide-react";
import { FormComponentPropsType } from "@/modules/global/types/global.types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CreateOrderFormSchemaType } from "../types/orders.types";
import { createOrderFormSchema } from "../schemas/orders-form.schema";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSuppliers } from "@/modules/suppliers/contexts/suppliers.context";
import { ListSupplierType } from "@/modules/suppliers/types/suppliers.types";
import { useProducts } from "@/modules/products/contexts/products.context";
import { ListProductType } from "@/modules/products/types/products.types";
import { useState } from "react";

const CreateOrderForm = ({
    visible,
    closeBottomSheet,
    formLoader,
    actionLoader,
    formAction,
}: FormComponentPropsType<CreateOrderFormSchemaType>) => {

    const { suppliersList } = useSuppliers();
    const { productsList, listProducts } = useProducts();

    const { register, control, setValue, reset, handleSubmit, formState: { errors } } = useForm<CreateOrderFormSchemaType>({
        resolver: zodResolver(createOrderFormSchema),
        defaultValues: {
            supplierId: '',
            orderItems: [{
                productId: '',
                quantity: 1
            }]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "orderItems"
    });

    const [awaitingProducts, setAwaitingProducts] = useState<boolean>(false);

    const handleListProductsBySupplierId = async (id) => {

        reset();
        setValue('supplierId', id);
        setAwaitingProducts(true);
        await listProducts({ supplierId: id });
        setAwaitingProducts(false);

    }

    return (

        <Sheet open={visible} onOpenChange={closeBottomSheet}>

            <SheetContent side={'bottom'} className="rounded-lg p-16 flex flex-col gap-3">

                <h1 className="text-4xl font-light flex flex-row items-center mb-6 gap-3">
                    Novo pedido
                </h1>

                {formLoader ? (

                    <div className="w-full flex flex-row items-center justify-start gap-3">
                        <Loader className="animate-spin text-primary w-8 h-8" />Obtendo dados do pedido...
                    </div>

                ) : (

                    <form onSubmit={handleSubmit((data) => formAction(data))} className='flex flex-col gap-3'>

                        <div className='flex flex-row w-full gap-3'>

                            <div className="flex flex-col w-[80%]">
                                <Controller
                                    name={'supplierId'}
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={(value) => { field.onChange(value); handleListProductsBySupplierId(value) }} value={field.value}>
                                            <SelectTrigger className="w-[100%]">
                                                <SelectValue placeholder="Fornecedor" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {suppliersList.map((x: ListSupplierType) => <SelectItem value={x.id}>{x.corporateName}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.supplierId?.message &&
                                    <span className="w-full text-xs text-red-700 flex flex-row items-center mt-2">
                                        <CircleAlert className="w-4 mr-1" />
                                        {errors.supplierId?.message}
                                    </span>
                                }
                            </div>

                            <Input placeholder={new Date().toLocaleDateString('pt-BR')} className='w-[20%]' disabled />

                        </div>

                        <span className="my-4">Produtos</span>

                        <ScrollArea className="h-[300px] -m-4">

                            <div className="flex flex-col gap-3 p-4">

                                {fields.map((_, index) => (

                                    <div key={index} className='flex flex-row w-full gap-3'>

                                        <div className="flex flex-col w-full">

                                            <Controller
                                                name={`orderItems.${index}.productId`}
                                                control={control}
                                                render={({ field }) => (
                                                    <Select onValueChange={field.onChange} value={field.value} disabled={awaitingProducts || !productsList.length}>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder={'Produtos'} />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {productsList.map((x: ListProductType) => (
                                                                <SelectItem value={x.id}>{x.description}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                )}
                                            />

                                            {errors.orderItems?.[index]?.productId?.message &&
                                                <span className="w-full text-xs text-red-700 flex flex-row items-center mt-2">
                                                    <CircleAlert className="w-4 mr-1" />
                                                    {errors.orderItems?.[index]?.productId?.message}
                                                </span>
                                            }

                                        </div>

                                        <div className="flex flex-col w-[20%]">

                                            <Input
                                                placeholder='Quantidade'
                                                className='w-[100%]'
                                                {...register(`orderItems.${index}.quantity`)}
                                                disabled={awaitingProducts}

                                            />

                                            {errors.orderItems?.[index]?.quantity?.message &&
                                                <span className="w-full text-xs text-red-700 flex flex-row items-center mt-2">
                                                    <CircleAlert className="w-4 mr-1" />
                                                    {errors.orderItems?.[index]?.quantity?.message}
                                                </span>
                                            }

                                        </div>

                                        <Button
                                            disabled={fields.length === 1 || awaitingProducts}
                                            variant={'outline'}
                                            onClick={() => remove(index)}
                                        >
                                            <X className="mr-2" />Remover produto
                                        </Button>

                                    </div>

                                ))}

                            </div>

                        </ScrollArea>

                        <div className='flex flex-row w-full gap-3 mt-4'>

                            <Button
                                variant={'secondary'}
                                onClick={(e) => {
                                    e.preventDefault(),
                                        append({ productId: '', quantity: 0 })
                                }}
                            >
                                <CircleFadingPlus className="mr-2" />Adicionar produto
                            </Button>

                        </div>

                        <div className='flex flex-row w-full gap-3 mt-4'>
                            <Button loading={actionLoader}>Salvar</Button>
                        </div>

                    </form>

                )}

            </SheetContent>

        </Sheet>

    );

}

export default CreateOrderForm;