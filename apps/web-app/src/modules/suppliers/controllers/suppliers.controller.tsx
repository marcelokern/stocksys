
import { useToast } from "@/components/ui/use-toast";
import { useGlobal } from "@/modules/global/contexts/global.context";
import { useEffect, useState } from "react";
import { SupplierFormSchemaType } from "../schemas/suppliers-form.schema";
import SuppliersView from "../views/suppliers.view";

const SuppliersController = () => {

    const { toast } = useToast();

    const {
        triggerLoader,
        closeBottomSheet
    } = useGlobal();

    const [selectedSupplier, setSelectedSupplier] = useState<string>('');

    const handleSelectSupplier = (id: string) => {

        setSelectedSupplier(id);

    }

    const handleListSuppliers = (filters?: { supplier: string }) => {

        triggerLoader('CONTENT', true);
        setTimeout(() => {
            triggerLoader('CONTENT', false);
        }, 3000);

    }

    const handleGetSupplierData = () => {

        triggerLoader('FORM', true);
        setTimeout(() => {
            triggerLoader('FORM', false);
        }, 3000);

    }

    const handleCreateSupplier = (supplierData: SupplierFormSchemaType) => {

        triggerLoader('ACTION', true);
        setTimeout(() => {
            triggerLoader('ACTION', false);
            handleListSuppliers();
            closeBottomSheet();
            toast({ variant: 'success', description: `Fornecedor cadastrado com sucesso!` });
        }, 3000);

    };

    const handleUpdateSupplier = (supplierData: SupplierFormSchemaType) => {

        triggerLoader('ACTION', true);
        setTimeout(() => {
            triggerLoader('ACTION', false);
            handleListSuppliers();
            closeBottomSheet();
            toast({ variant: 'success', description: `Fornecedor ${selectedSupplier} editado com sucesso!` });
        }, 3000);

    };

    const handleRemoveSupplier = () => {

        triggerLoader('ACTION', true);
        setTimeout(() => {
            triggerLoader('ACTION', false);
            handleListSuppliers();
            closeBottomSheet();
            toast({ variant: 'success', description: `Fornecedor ${selectedSupplier} removido com sucesso!` });
        }, 3000);

    };

    useEffect(() => {
        handleListSuppliers();
    }, []);

    return (
        <SuppliersView
            state={{}}
            handlers={{
                handleSelectSupplier,
                handleListSuppliers,
                handleGetSupplierData,
                handleCreateSupplier,
                handleUpdateSupplier,
                handleRemoveSupplier,
            }}
        />
    );

};

export default SuppliersController;