import { useGlobal } from "@/modules/global/contexts/global.context";
import { useNavigate } from "react-router-dom";
import FirstAccessView from "../views/first-access.view";
import { useLogin } from "../contexts/login.context";
import { UpdatePasswordFormSchema } from "../schemas/update-password.schema";

const FirstAccessController = () => {

    const navigate = useNavigate();
    const { triggerLoader } = useGlobal();
    const { updatePasswordFirstAccess } = useLogin();

    const handleUpdatePassword = async (data: UpdatePasswordFormSchema) => {

        triggerLoader('ACTION', true);
        const actionResult = await updatePasswordFirstAccess(data);
        if (actionResult.login && actionResult.navigate) navigate(actionResult.navigate);
        triggerLoader('ACTION', false);

    }

    return <FirstAccessView state={{}} handlers={{ handleUpdatePassword }} />;

};

export default FirstAccessController;