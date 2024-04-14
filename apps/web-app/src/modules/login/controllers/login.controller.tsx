import { useGlobal } from "@/modules/global/contexts/global.context";
import { useNavigate } from "react-router-dom";
import { LoginFormSchemaType } from "../schemas/login-form.schema";
import LoginView from "../views/login.view";
import FirstAccessView from "../views/first-access.view";
import { useState } from "react";

const LoginController = () => {

    const [firstAccess, setFirstAccess] = useState<boolean>(false);

    const {
        triggerLoader
    } = useGlobal();

    const navigate = useNavigate();

    const handleAuthenticate = (data: LoginFormSchemaType) => {

        triggerLoader('ACTION', true);
        setTimeout(() => {
            triggerLoader('ACTION', false);
            setFirstAccess(true);
        }, 2000)

    }

    const handleSetPassword = (data: LoginFormSchemaType) => {

        triggerLoader('ACTION', true);
        setTimeout(() => {
            triggerLoader('ACTION', false);
            navigate('/produtos')
        }, 2000)

    }

    return firstAccess ? <FirstAccessView state={{}} handlers={{ handleSetPassword }} /> : <LoginView state={{}} handlers={{ handleAuthenticate }} />

};

export default LoginController;