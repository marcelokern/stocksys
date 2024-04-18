import { useTheme } from "@/modules/global/contexts/theme.context";
import { useLogin } from "@/modules/login/contexts/login.context";
import { ArrowDownUp, BarChart, ChevronDown, ListCollapse, LockKeyhole, LogOut, Moon, Package, Store, Sun, User, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../../components/ui/dropdown-menu";
import ChangePassword from "./change-password.component";
import { useGlobal } from "../contexts/global.context";

const Header = () => {

    const navigate = useNavigate();

    const { theme, setTheme } = useTheme();
    const { logout } = useLogin();
    const { getUserInfo } = useLogin();
    const { role, name } = getUserInfo();

    const {
        bottomSheetVisible,
        bottomSheetContent,
        openBottomSheet,
        closeBottomSheet
    } = useGlobal();

    return (

        <header className="sticky top-0 flex items-center gap-4 border-b border-t-4 border-t-primary p-8 backdrop-blur">

            <h1 className="mr-6 text-2xl font-semibold">
                stocksys<span className="text-primary">.</span>
            </h1>

            <nav className="flex-1 flex flex-row gap-2">
                {role && (role === 'ADMIN' || role === 'MANAGER') && <Button variant={'ghost'} onClick={() => navigate('/produtos')}><Package className="w-4 h-4 mr-2 text-primary" />Produtos</Button>}
                {role && (role === 'ADMIN' || role === 'MANAGER') && <Button variant={'ghost'} onClick={() => navigate('/fornecedores')}><Store className="w-4 h-4 mr-2 text-primary" />Fornecedores</Button>}
                {role && (role === 'ADMIN' || role === 'MANAGER' || role === 'OPERATOR') && <Button variant={'ghost'} onClick={() => navigate('/movimentacoes')}><ArrowDownUp className="w-4 h-4 mr-2 text-primary" />Movimentações</Button>}
                {role && (role === 'ADMIN' || role === 'MANAGER') && <Button variant={'ghost'} onClick={() => navigate('/pedidos')}><ListCollapse className="w-4 h-4 mr-2 text-primary" />Pedidos</Button>}
                {role && (role === 'ADMIN' || role === 'MANAGER') && <Button variant={'ghost'} onClick={() => navigate('/relatorios')}><BarChart className="w-4 h-4 mr-2 text-primary" />Relatórios</Button>}
                {role && (role === 'ADMIN' || role === 'MANAGER') && <Button variant={'ghost'} onClick={() => navigate('/usuarios')}><Users className="w-4 h-4 mr-2 text-primary" />Usuários</Button>}
            </nav>

            <div className="flex flex-row items-center text-sm">

                <Button variant={'ghost'} className="mr-4" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}</Button>

                <span>Olá, {name}!</span>

                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Button variant={'ghost'} className="ml-4">
                            <User className="w-4 h-4 mr-1 text-primary" />
                            <ChevronDown className="w-4 h-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="mr-4">
                        <DropdownMenuItem onClick={() => openBottomSheet('CHANGE_PASSWORD')}>
                            <LockKeyhole className="w-4 h-4 mr-2" />Alterar senha
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => logout(navigate)}>
                            <LogOut className="w-4 h-4 mr-2" />Sair
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

            </div>

            <ChangePassword
                visible={bottomSheetVisible && bottomSheetContent === 'CHANGE_PASSWORD'}
                closeBottomSheet={closeBottomSheet}
            />

        </header>

    );

};

export default Header;