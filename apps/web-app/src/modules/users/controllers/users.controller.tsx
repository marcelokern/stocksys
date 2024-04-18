import { useGlobal } from "@/modules/global/contexts/global.context";
import { useEffect, useState } from "react";
import UsersView from "../views/users.view";
import { useUsers } from "../contexts/users.context";
import { CreateUserFormSchemaType, UsersListParametersType } from "../types/users.types";

const UsersController = () => {

    const {
        triggerLoader,
        closeBottomSheet
    } = useGlobal();

    const {
        listUsers,
        getUser,
        createUser,
        updateUser,
        deleteUser
    } = useUsers();

    const [selectedUser, setSelectedUser] = useState<string>('');

    const handleSelectUser = (id: string) => {

        setSelectedUser(id);

    }

    const handleListUsers = async (parameters?: UsersListParametersType) => {

        triggerLoader('CONTENT', true);
        await listUsers(parameters)
        triggerLoader('CONTENT', false);

    }

    const handleGetUserData = async (id: string) => {

        triggerLoader('FORM', true);
        await getUser(id);
        triggerLoader('FORM', false);

    }

    const handleCreateUser = async (userData: CreateUserFormSchemaType) => {

        triggerLoader('ACTION', true);
        await createUser(userData);
        triggerLoader('ACTION', false);
        handleListUsers();
        closeBottomSheet();

    };

    const handleUpdateUser = async (userData: CreateUserFormSchemaType) => {

        triggerLoader('ACTION', true);
        await updateUser(selectedUser, userData);
        triggerLoader('ACTION', false);
        handleListUsers();
        closeBottomSheet();

    };

    const handleRemoveUser = async () => {

        triggerLoader('ACTION', true);
        await deleteUser(selectedUser);
        triggerLoader('ACTION', false);
        handleListUsers();
        closeBottomSheet();

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