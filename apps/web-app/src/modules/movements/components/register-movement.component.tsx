import { Button } from "@/components/ui/button";
import { Card } from '@/components/ui/card';
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowDownUp, CircleFadingPlus, Minus, Plus } from "lucide-react";
import { CreateMovementFormSchemaType, RegisterMovementComponentPropsType } from "../types/movements.types";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createMovementFormSchema } from "../schemas/movements-form.schema";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useProducts } from "@/modules/products/contexts/products.context";
import { ListProductType } from "@/modules/products/types/products.types";

const RegisterMovement = ({ handleCreateMovement, actionLoader }: RegisterMovementComponentPropsType) => {

    const {
        register,
        handleSubmit,
        control,
        setValue,
        reset,
        getValues,
        formState: { isDirty, isValid }
    } = useForm<CreateMovementFormSchemaType>({ resolver: zodResolver(createMovementFormSchema), mode: "onChange" });

    const { productsList } = useProducts();

    return (

        <Card className="flex flex-col items-center p-10 justify-center border-b-8 flex-1">

            <form onSubmit={handleSubmit((data) => { handleCreateMovement(data); reset(); })} className='flex flex-col gap-3 items-center'>

                <ArrowDownUp className="w-12 h-12 text-primary" />
                <h2 className="font-semibold text-3xl mb-2">Registrar Movimentação</h2>

                <div className="flex flex-col gap-6 items-center py-4">

                    <Controller
                        name={'type'}
                        control={control}
                        render={({ field }) => (
                            <Tabs onValueChange={field.onChange}>
                                <TabsList defaultValue="IN">
                                    <TabsTrigger value="IN">Entrada</TabsTrigger>
                                    <TabsTrigger value="OUT">Saída</TabsTrigger>
                                    <TabsTrigger value="BAL">Balanço</TabsTrigger>
                                </TabsList>
                            </Tabs>
                        )}
                    />

                    <Controller
                        name={'productId'}
                        control={control}
                        render={({ field }) => (
                            <Select onValueChange={field.onChange}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Produto" />
                                </SelectTrigger>
                                <SelectContent>
                                    {productsList.map((x: ListProductType) => <SelectItem value={x.id}>{x.description}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        )}
                    />

                    <Input placeholder="Descrição" {...register('description')}></Input>

                    <div className="flex flex-row items-center justify-center gap-2">

                        <Button
                            variant={'outline'}
                            onClick={(e) => {
                                e.preventDefault();
                                getValues('quantity') != 0 && setValue("quantity", parseInt(getValues('quantity')) - 1);
                            }}
                        >
                            <Minus />
                        </Button>

                        <Input
                            type="number"
                            defaultValue={1}
                            className="text-center"
                            {...register('quantity')}
                        />

                        <Button
                            variant={'outline'}
                            onClick={(e) => {
                                e.preventDefault();
                                setValue("quantity", parseInt(getValues('quantity')) + 1);
                            }}
                        >
                            <Plus />
                        </Button>

                    </div>

                </div>

                <Button
                    disabled={!isDirty || !isValid}
                    variant={!(!isDirty || !isValid) ? 'default' : 'secondary'}
                    loading={actionLoader}
                >
                    <CircleFadingPlus className="mr-2" />Registrar
                </Button>

            </form>

        </Card>
    );
};

export default RegisterMovement;