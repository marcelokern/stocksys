import { useGlobal } from "@/modules/global/contexts/global.context";
import { useNavigate } from "react-router-dom";
import { LoginFormSchemaType } from "../schemas/login-form.schema";
import LoginView from "../views/login.view";
import { useLogin } from "../contexts/login.context";

const LoginController = () => {

    const navigate = useNavigate();
    const { triggerLoader } = useGlobal();
    const { login } = useLogin();

    const handleLogin = async (data: LoginFormSchemaType) => {

        triggerLoader('ACTION', true);
        const actionResult = await login(data);
        if (actionResult.login) actionResult.passwordCreated ? navigate(actionResult.navigate) : navigate('/primeiro-acesso');
        triggerLoader('ACTION', false);

    }

    return <LoginView state={{}} handlers={{ handleLogin }} />;

};

export default LoginController;