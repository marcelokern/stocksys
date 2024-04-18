import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Ban, Check, Clock, Loader } from "lucide-react";
import { OrderType } from "../types/orders.types";
import { FormComponentPropsType } from "@/modules/global/types/global.types";

const ViewOrderSheet = ({
    visible,
    closeBottomSheet,
    formLoader,
    formData,
    formAction,
}: FormComponentPropsType<OrderType>) => {

    return (

        <Sheet open={visible} onOpenChange={closeBottomSheet}>

            <SheetContent side={'bottom'} className="rounded-lg p-16 flex flex-col gap-3">

                {formLoader ? (

                    <div className="w-full flex flex-row items-center justify-start gap-3">
                        <Loader className="animate-spin text-primary w-8 h-8" />Obtendo dados do pedido...
                    </div>

                ) : (
                    <>
                        <h1 className="text-4xl font-light flex flex-row items-center mb-6 gap-3">

                            Detalhes do pedido #{formData.code}

                            {formData.status === 'PENDING' &&
                                <Badge>
                                    <Clock className="w-4 mr-2" />Pendente
                                </Badge>
                            }

                            {formData.status === 'CANCEL' &&
                                <Badge className="bg-red-500 hover:bg-red-500">
                                    <Ban className="w-4 mr-2" />Cancelado
                                </Badge>
                            }

                            {formData.status === 'COMPLETE' &&
                                <Badge className="bg-green-500 hover:bg-green-500">
                                    <Check className="w-4 mr-2" />Finalizado
                                </Badge>
                            }

                            <span className="flex-1 text-xl text-right">{formData.supplierCorporateName}</span>

                            <span className="text-xl">{new Date(formData.date).toLocaleDateString('pt-BR')}</span>

                        </h1>

                        <div className='flex flex-col gap-3'>

                            <ScrollArea className="h-[300px] -m-4">

                                <Table>

                                    <TableHeader>

                                        <TableRow>
                                            <TableHead>Código</TableHead>
                                            <TableHead className="w-1/2">Produto</TableHead>
                                            <TableHead>Quantidade</TableHead>
                                            <TableHead>Unidade</TableHead>
                                        </TableRow>

                                    </TableHeader>

                                    <TableBody>

                                        {formData?.orderItems?.map((x) => (

                                            <TableRow>
                                                <TableCell>{x.code}</TableCell>
                                                <TableCell className="w-1/2">{x.description}</TableCell>
                                                <TableCell>{x.quantity}</TableCell>
                                                <TableCell>{x.measureUnit}</TableCell>
                                            </TableRow>

                                        ))}

                                    </TableBody>

                                </Table>

                            </ScrollArea>

                            {formData.status === 'PENDING' &&

                                <div className='flex flex-row w-full gap-3 mt-4'>

                                    <Button
                                        variant={'default'}
                                        onClick={() => formAction(formData.id, 'COMPLETE')}
                                    >
                                        <Check className="mr-2" />Finalizar pedido
                                    </Button>

                                    <Button
                                        variant={'outline'}
                                        onClick={() => formAction(formData.id, 'COMPLETE')}
                                    >
                                        <Ban className="mr-2" />Cancelar pedido
                                    </Button>

                                </div>
                            }

                        </div>

                    </>

                )}

            </SheetContent>

        </Sheet>

    );

}

export default ViewOrderSheet;