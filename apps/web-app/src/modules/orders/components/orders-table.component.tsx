import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TableComponentPropsType } from "@/modules/global/types/global.types";
import { Ban, Check, Clock, ListCollapse, Loader, MoreHorizontal } from "lucide-react";
import { OrderListItemType } from "../types/orders.types";

const OrdersTable = ({
    data,
    contentLoader,
    handleView,
    handleUpdateStatus
}: TableComponentPropsType<OrderListItemType>) => {

    return (

        contentLoader ? (

            <div className="w-full flex flex-col items-center justify-center gap-3 p-8">
                <Loader className="animate-spin text-primary w-8 h-8" />Carregando Pedidos...
            </div>

        ) : (

            data.length === 0 ? <div className="w-full text-center p-8 opacity-30">Nenhum pedido encontrado</div> : (

                <Table className="mt-8">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Data</TableHead>
                            <TableHead>Código</TableHead>
                            <TableHead className='w-1/2'>Fornecedor</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="w-1"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((x: OrderListItemType, i: number) =>
                            <TableRow key={i}>
                                <TableCell>{x.date}</TableCell>
                                <TableCell>{x.code}</TableCell>
                                <TableCell>{x.supplierCorporateName}</TableCell>
                                <TableCell>

                                    {x.status === 'PENDING' && <Badge><Clock className="w-4 mr-2" />Pendente</Badge>}
                                    {x.status === 'CANCEL' && <Badge className="bg-red-500 hover:bg-red-500"><Ban className="w-4 mr-2" />Cancelado</Badge>}
                                    {x.status === 'FINISH' && <Badge className="bg-green-500 hover:bg-green-500"><Check className="w-4 mr-2" />Finalizado</Badge>}

                                </TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <Button variant={'ghost'}>
                                                <MoreHorizontal className="w-4 h-4" />
                                            </Button>
                                        </DropdownMenuTrigger>

                                        <DropdownMenuContent className="mr-6">

                                            <DropdownMenuItem onClick={() => handleView && handleView(x.id)}>
                                                <ListCollapse className="w-4 h-4 mr-2" />Ver detalhes
                                            </DropdownMenuItem>

                                            {x.status === 'PENDING' && (

                                                <>
                                                    <DropdownMenuItem onClick={() => handleUpdateStatus && handleUpdateStatus(x.id, 'FINISH')}>
                                                        <Check className="w-4 h-4 mr-2" />Finalizar pedido
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleUpdateStatus && handleUpdateStatus(x.id, 'CANCEL')}>
                                                        <Ban className="w-4 h-4 mr-2" />Cancelar pedido
                                                    </DropdownMenuItem>
                                                </>

                                            )}

                                        </DropdownMenuContent>

                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

            )
        )
    )
};

export default OrdersTable;