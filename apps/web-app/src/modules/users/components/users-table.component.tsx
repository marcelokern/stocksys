import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader, MoreHorizontal, Pencil, Trash } from "lucide-react";
import { TableComponentPropsType } from "@/modules/global/types/global.types";
import { Badge } from "@/components/ui/badge";
import { ListUserType } from "../types/users.types";
import { useLogin } from "@/modules/login/contexts/login.context";

const UsersTable = ({
    data,
    contentLoader,
    handleEdit,
    handleRemove
}: TableComponentPropsType<ListUserType>) => {

    const { getUserInfo } = useLogin();

    const { role } = getUserInfo();

    return (

        contentLoader ? (

            <div className="w-full flex flex-col items-center justify-center gap-3 p-8">
                <Loader className="animate-spin text-primary w-8 h-8" />Carregando Usuários...
            </div>

        ) : (

            data.length === 0 ? <div className="w-full text-center p-8 opacity-30">Nenhum usuário encontrado</div> : (

                <Table className="mt-8">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Matrícula</TableHead>
                            <TableHead>Nome</TableHead>
                            <TableHead>E-mail</TableHead>
                            <TableHead className="text-center">Função</TableHead>
                            <TableHead className="w-1"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((x: ListUserType, i: number) =>
                            <TableRow key={i}>
                                <TableCell>{x.registration}</TableCell>
                                <TableCell className='w-1/2'>{x.name}</TableCell>
                                <TableCell>{x.email}</TableCell>
                                <TableCell className="text-center">
                                    {x.role === 'ADMIN' && <Badge className="py-2 px-4">ADMIN</Badge>}
                                    {x.role === 'MANAGER' && <Badge variant={'secondary'} className="py-2 px-4">GESTOR</Badge>}
                                    {x.role === 'OPERATOR' && <Badge variant={'outline'} className="py-2 px-4">OPERADOR</Badge>}
                                </TableCell>
                                <TableCell>
                                    {(role === 'ADMIN' || (role === 'MANAGER' && x.role === 'OPERATOR')) &&
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
                                    }
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

            )
        )
    )
};

export default UsersTable;