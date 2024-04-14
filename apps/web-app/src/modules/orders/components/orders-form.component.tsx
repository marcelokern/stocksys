import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useForm, useFieldArray } from "react-hook-form";
import { OrderFormSchemaType, orderFormSchema } from "../schemas/orders-form.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Ban, Check, CircleFadingPlus, Clock, Loader, X } from "lucide-react";
import { FormComponentPropsType } from "@/modules/global/types/global.types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

const OrdersForm = ({
    visible,
    closeBottomSheet,
    title,
    formLoader,
    formData,
    actionLoader,
    formAction,
    content
}: FormComponentPropsType<OrderFormSchemaType>) => {

    const { register, control, handleSubmit, formState: { errors } } = useForm<OrderFormSchemaType>({
        resolver: zodResolver(orderFormSchema),
        defaultValues: {
            products: [{
                productId: '',
                quantity: 1
            }]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "products"
    });

    return (

        <Sheet open={visible} onOpenChange={closeBottomSheet}>

            <SheetContent side={'bottom'} className="rounded-lg p-16 flex flex-col gap-3">

                <h1 className="text-4xl font-light flex flex-row items-center mb-6 gap-3">
                    {title}
                    {formData.status === 'CANCEL' && <Badge><Clock className="w-4 mr-2" />Pendente</Badge>}
                    {formData.status === 'CANCEL' && <Badge className="bg-red-500 hover:bg-red-500"><Ban className="w-4 mr-2" />Cancelado</Badge>}
                    {formData.status === 'FINISH' && <Badge className="bg-green-500 hover:bg-green-500"><Check className="w-4 mr-2" />Finalizado</Badge>}</h1>

                {formLoader ? (

                    <div className="w-full flex flex-row items-center justify-start gap-3">
                        <Loader className="animate-spin text-primary w-8 h-8" />Obtendo dados do pedido...
                    </div>

                ) : (

                    <form onSubmit={handleSubmit((data) => formAction(data))} className='flex flex-col gap-3'>

                        <div className='flex flex-row w-full gap-3'>
                            <Input placeholder='Fornecedor' error={errors.supplierId?.message} {...register('supplierId')} disabled={content === 'FORM_VIEW'} />
                            <Input placeholder='01/01/2020' className='w-[20%]' disabled />

                        </div>

                        <span className="my-4">Produtos</span>

                        <ScrollArea className="h-[300px] -m-4">

                            <div className="flex flex-col gap-3 p-4">
                                {fields.map((_, index) => (

                                    <div key={index} className='flex flex-row w-full gap-3'>

                                        <Input
                                            placeholder='Produto'
                                            className='flex-1'
                                            {...register(`products.${index}.productId`)}
                                            error={errors.products?.[index]?.productId?.message}
                                            disabled={content === 'FORM_VIEW'}
                                        />

                                        <Input
                                            placeholder='Quantidade'
                                            className='w-[20%]'
                                            {...register(`products.${index}.quantity`)}
                                            error={errors.products?.[index]?.quantity?.message}
                                            disabled={content === 'FORM_VIEW'}
                                        />

                                        {content === 'FORM_CREATE' &&
                                            <Button
                                                disabled={fields.length === 1}
                                                variant={'outline'}
                                                onClick={() => remove(index)}
                                            >
                                                <X className="mr-2" />Remover produto
                                            </Button>}

                                    </div>

                                ))}

                            </div>

                        </ScrollArea>

                        {content === 'FORM_CREATE' && (
                            <>
                                <div className='flex flex-row w-full gap-3 mt-4'>

                                    <Button
                                        variant={'secondary'}
                                        onClick={(e) => { e.preventDefault(), append({ productId: '', quantity: 0 }) }}
                                    >
                                        <CircleFadingPlus className="mr-2" />Adicionar produto
                                    </Button>

                                </div>

                                <div className='flex flex-row w-full gap-3 mt-4'>
                                    <Button loading={actionLoader}>Salvar</Button>
                                </div>
                            </>
                        )}

                    </form>

                )}

            </SheetContent>

        </Sheet>

    );

}

export default OrdersForm;