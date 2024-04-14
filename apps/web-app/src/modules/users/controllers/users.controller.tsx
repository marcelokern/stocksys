
import { useToast } from "@/components/ui/use-toast";
import { useGlobal } from "@/modules/global/contexts/global.context";
import { useEffect, useState } from "react";
import { UserFormSchemaType } from "../schemas/users-form.schema";
import UsersView from "../views/users.view";

const UsersController = () => {

    const { toast } = useToast();

    const {
        triggerLoader,
        closeBottomSheet
    } = useGlobal();

    const [selectedUser, setSelectedUser] = useState<string>('');

    const handleSelectUser = (id: string) => {

        setSelectedUser(id);

    }

    const handleListUsers = (filter?: { user: string }) => {

        triggerLoader('CONTENT', true);
        setTimeout(() => {
            triggerLoader('CONTENT', false);
        }, 3000);

    }

    const handleGetUserData = () => {

        triggerLoader('FORM', true);
        setTimeout(() => {
            triggerLoader('FORM', false);
        }, 3000);

    }

    const handleCreateUser = (userData: UserFormSchemaType) => {

        triggerLoader('ACTION', true);
        setTimeout(() => {
            triggerLoader('ACTION', false);
            handleListUsers();
            closeBottomSheet();
            toast({ variant: 'success', description: `Usuário cadastrado com sucesso!` });
        }, 3000);

    };

    const handleUpdateUser = (userData: UserFormSchemaType) => {

        triggerLoader('ACTION', true);
        setTimeout(() => {
            triggerLoader('ACTION', false);
            handleListUsers();
            closeBottomSheet();
            toast({ variant: 'success', description: `Usuário ${selectedUser} editado com sucesso!` });
        }, 3000);

    };

    const handleRemoveUser = () => {

        triggerLoader('ACTION', true);
        setTimeout(() => {
            triggerLoader('ACTION', false);
            handleListUsers();
            closeBottomSheet();
            toast({ variant: 'success', description: `Usuário ${selectedUser} removido com sucesso!` });
        }, 3000);

    };

    useEffect(() => {
        handleListUsers();
    }, []);

    return (
        <UsersView
            state={{}}
            handlers={{
                handleSelectUser,
                handleListUsers,
                handleGetUserData,
                handleCreateUser,
                handleUpdateUser,
                handleRemoveUser,
            }}
        />
    );

};

export default UsersController;