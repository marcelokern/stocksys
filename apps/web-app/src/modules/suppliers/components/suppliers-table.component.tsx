import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader, MoreHorizontal, Pencil, Trash } from "lucide-react";
import { SupplierListItemType } from "../types/suppliers.types";
import { TableComponentPropsType } from "@/modules/global/types/global.types";

const SuppliersTable = ({
    data,
    contentLoader,
    handleEdit,
    handleRemove
}: TableComponentPropsType<SupplierListItemType>) => {

    return (

        contentLoader ? (

            <div className="w-full flex flex-col items-center justify-center gap-3 p-8">
                <Loader className="animate-spin text-primary w-8 h-8" />Carregando Fornecedores...
            </div>

        ) : (

            data.length === 0 ? <div className="w-full text-center p-8 opacity-30">Nenhum fornecedor encontrado</div> : (

                <Table className="mt-8">
                    <TableHeader>
                        <TableRow>
                            <TableHead>CNPJ</TableHead>
                            <TableHead>Razão Social</TableHead>
                            <TableHead>E-mail</TableHead>
                            <TableHead className="w-1"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((x: SupplierListItemType, i: number) =>
                            <TableRow key={i}>
                                <TableCell>{x.cnpj}</TableCell>
                                <TableCell className='w-1/2'>{x.corporateName}</TableCell>
                                <TableCell>{x.email}</TableCell>
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

export default SuppliersTable;