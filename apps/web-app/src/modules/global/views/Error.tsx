import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLogin } from "@/modules/login/contexts/login.context";

const ErrorScreen = () => {

    const navigate = useNavigate();
    const { logout } = useLogin()

    return (
        <div className="w-full h-full min-h-screen flex flex-col items-center justify-center">
            <h1 className="font-semibold text-4xl mb-4">Ops, algo deu errado :(</h1>
            <h2 className="text-xl mb-4">Por favor, tente novamente</h2>
            <Button variant={'outline'} onClick={() => { logout(navigate) }}>
                <ArrowLeft className="w-4 mr-2" />Voltar
            </Button>
        </div>
    );

};

export default ErrorScreen;