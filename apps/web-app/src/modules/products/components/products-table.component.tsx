import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader, MoreHorizontal, Pencil, Trash } from "lucide-react";
import { ProductListItemType } from "../types/products.types";
import { TableComponentPropsType } from "@/modules/global/types/global.types";

const ProductsTable = ({
    data,
    contentLoader,
    handleEdit,
    handleRemove
}: TableComponentPropsType<ProductListItemType>) => {

    return (

        contentLoader ? (

            <div className="w-full flex flex-col items-center justify-center gap-3 p-8">
                <Loader className="animate-spin text-primary w-8 h-8" />Carregando Produtos...
            </div>

        ) : (

            data.length === 0 ? <div className="w-full text-center p-8 opacity-30">Nenhum produto encontrado</div> : (

                <Table className="mt-8">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Código</TableHead>
                            <TableHead>Descrição</TableHead>
                            <TableHead>Unidade</TableHead>
                            <TableHead>Endereço</TableHead>
                            <TableHead>Fornecedor</TableHead>
                            <TableHead className="w-1"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((x: ProductListItemType, i: number) =>
                            <TableRow key={i}>
                                <TableCell>{x.code}</TableCell>
                                <TableCell className='w-1/2'>{x.description}</TableCell>
                                <TableCell>{x.measureUnit}</TableCell>
                                <TableCell>{x.address}</TableCell>
                                <TableCell>{x.supplierCorporateName}</TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <Button variant={'ghost'}>
                                                <MoreHorizontal className="w-4 h-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="mr-4">
                                            <DropdownMenuItem onClick={() => handleEdit(x.id)}>
                                                <Pencil className="w-4 h-4 mr-2" />Editar
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleRemove(x.id)}>
                                                <Trash className="w-4 h-4 mr-2" />Remover
                                            </DropdownMenuItem>
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

export default ProductsTable;