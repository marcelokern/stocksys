import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FilterContainer from '@/modules/global/components/filter-container.component';
import MainTitle from '@/modules/global/components/main-title.component';
import MainContainer from '@/modules/global/components/main.component';
import { CircleFadingPlus, Filter, X } from "lucide-react";
import SuppplierForm from '../components/users-form.component';
import UsersTable from '../components/users-table.component';
import { UsersViewPropsType } from '../types/users.types';
import ConfirmDialog from "@/modules/global/components/confirm-dialog.component";
import { useGlobal } from "@/modules/global/contexts/global.context";
import { useUsers } from "../contexts/users.context";
import { useState } from "react";

const UsersView = ({ handlers }: UsersViewPropsType) => {

    const {
        contentLoader,
        formLoader,
        actionLoader,
        bottomSheetVisible,
        bottomSheetContent,
        openBottomSheet,
        closeBottomSheet
    } = useGlobal();

    const {
        usersList,
        userData
    } = useUsers();

    const {
        handleSelectUser,
        handleListUsers,
        handleGetUserData,
        handleCreateUser,
        handleUpdateUser,
        handleRemoveUser
    } = handlers;

    const [filterUserInput, setFilterUserInput] = useState('');

    return (

        <MainContainer>

            <SuppplierForm
                visible={bottomSheetVisible && (bottomSheetContent === 'FORM_CREATE' || bottomSheetContent === 'FORM_EDIT')}
                closeBottomSheet={closeBottomSheet}
                title={bottomSheetContent === 'FORM_CREATE' ? 'Cadastrar novo usuário' : 'Editar usuário'}
                formLoader={formLoader}
                formData={userData}
                actionLoader={actionLoader}
                formAction={bottomSheetContent === 'FORM_CREATE' ? handleCreateUser : handleUpdateUser}
            />

            <ConfirmDialog
                visible={bottomSheetVisible && bottomSheetContent === 'CONFIRM_DELETE'}
                closeBottomSheet={closeBottomSheet}
                title={'Remover usuário'}
                description={'bla bla bla'}
                actionLoader={actionLoader}
                confirmAction={handleRemoveUser}
            />

            <MainTitle
                title={['Usuários']}
                buttons={[
                    <Button onClick={() => openBottomSheet('FORM_CREATE')} className="flex flex-row items-center gap-2">
                        <CircleFadingPlus />Cadastrar Usuário
                    </Button>
                ]}
            />

            <FilterContainer title={'Filtrar usuários'}>

                <Input placeholder="Fornecedor" value={filterUserInput} onChange={(e) => setFilterUserInput(e.target.value)} />

                <Button variant={'outline'} className="text-foreground" disabled={!filterUserInput} onClick={() => { handleListUsers({ user: filterUserInput }) }}>
                    <Filter className="w-4 mr-2" />Filtrar
                </Button>

                {filterUserInput &&
                    <Button variant={'link'} onClick={() => { setFilterUserInput(''); handleListUsers(); }}>
                        <X className="w-4 mr-2" />Limpar Filtros
                    </Button>
                }

            </FilterContainer>

            <UsersTable
                data={usersList}
                contentLoader={contentLoader}
                handleEdit={(id: string) => { openBottomSheet('FORM_EDIT'); handleSelectUser(id); handleGetUserData(); }}
                handleRemove={(id: string) => { openBottomSheet('CONFIRM_DELETE'); handleSelectUser(id) }}
            />

        </MainContainer>

    );
};

export default UsersView;