import { useGlobal } from "@/modules/global/contexts/global.context";
import { useNavigate } from "react-router-dom";
import FirstAccessView from "../views/first-access.view";
import { useLogin } from "../contexts/login.context";
import { UpdatePasswordFormSchema } from "../schemas/update-password.schema";

const FirstAccessController = () => {

    const navigate = useNavigate();
    const { triggerLoader } = useGlobal();
    const { updatePassword } = useLogin();

    const handleUpdatePassword = async (data: UpdatePasswordFormSchema) => {

        triggerLoader('ACTION', true);
        const actionResult = await updatePassword(data);
        if (actionResult) navigate('/produtos');
        triggerLoader('ACTION', false);

    }

    return <FirstAccessView state={{}} handlers={{ handleUpdatePassword }} />;

};

export default FirstAccessController;