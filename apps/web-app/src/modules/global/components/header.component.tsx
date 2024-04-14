import { ArrowDownUp, BarChart, ChevronDown, ListCollapse, LockKeyhole, LogOut, Moon, Package, Store, Sun, User, Users } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { useTheme } from "@/modules/global/contexts/theme.context";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../../components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

const Header = () => {

    const { theme, setTheme } = useTheme();
    const navigate = useNavigate()

    return (

        <header className="sticky top-0 flex items-center gap-4 border-b border-t-4 border-t-primary p-8 backdrop-blur">

            <h1 className="mr-6 text-2xl font-semibold">
                stocksys<span className="text-primary">.</span>
            </h1>

            <nav className="flex-1 flex flex-row gap-2">
                <Button variant={'ghost'} onClick={() => navigate('/produtos')}><Package className="w-4 h-4 mr-2 text-primary" />Produtos</Button>
                <Button variant={'ghost'} onClick={() => navigate('/fornecedores')}><Store className="w-4 h-4 mr-2 text-primary" />Fornecedores</Button>
                <Button variant={'ghost'} onClick={() => navigate('/movimentacoes')}><ArrowDownUp className="w-4 h-4 mr-2 text-primary" />Movimentações</Button>
                <Button variant={'ghost'} onClick={() => navigate('/pedidos')}><ListCollapse className="w-4 h-4 mr-2 text-primary" />Pedidos</Button>
                <Button variant={'ghost'} onClick={() => navigate('/relatorios')}><BarChart className="w-4 h-4 mr-2 text-primary" />Relatórios</Button>
                <Button variant={'ghost'} onClick={() => navigate('/usuarios')}><Users className="w-4 h-4 mr-2 text-primary" />Usuários</Button>
            </nav>

            <div className="flex flex-row items-center text-sm">

                <Button variant={'ghost'} className="mr-4" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}</Button>

                <span>Olá, Marcelo!</span>

                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Button variant={'ghost'} className="ml-4"><User className="w-4 h-4 mr-1 text-primary" />
                            <ChevronDown className="w-4 h-4" />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="mr-4">
                        <DropdownMenuItem><User className="w-4 h-4 mr-2" />Minha conta</DropdownMenuItem>
                        <DropdownMenuItem><LockKeyhole className="w-4 h-4 mr-2" />Alterar senha</DropdownMenuItem>
                        <DropdownMenuItem><LogOut className="w-4 h-4 mr-2" />Sair</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

            </div>

        </header>

    );

};

export default Header;