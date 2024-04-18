
import { useGlobal } from "@/modules/global/contexts/global.context";
import { useEffect, useState } from "react";
import SuppliersView from "../views/suppliers.view";
import { useSuppliers } from "../contexts/suppliers.context";
import { CreateSupplierFormSchemaType, SupplierListParametersType } from "../types/suppliers.types";

const SuppliersController = () => {

    const {
        triggerLoader,
        closeBottomSheet
    } = useGlobal();

    const {
        listSuppliers,
        getSupplier,
        createSupplier,
        updateSupplier,
        deleteSupplier
    } = useSuppliers();

    const [selectedSupplier, setSelectedSupplier] = useState<string>('');

    const handleSelectSupplier = (id: string) => {

        setSelectedSupplier(id);

    }

    const handleListSuppliers = async (parameters?: SupplierListParametersType) => {

        triggerLoader('CONTENT', true);
        await listSuppliers(parameters);
        triggerLoader('CONTENT', false);

    }

    const handleGetSupplierData = async (id: string) => {

        triggerLoader('FORM', true);
        await getSupplier(id);
        triggerLoader('FORM', false);

    }

    const handleCreateSupplier = async (supplierData: CreateSupplierFormSchemaType) => {

        triggerLoader('ACTION', true);
        await createSupplier(supplierData);
        triggerLoader('ACTION', false);
        handleListSuppliers();
        closeBottomSheet();

    };

    const handleUpdateSupplier = async (supplierData: CreateSupplierFormSchemaType) => {

        triggerLoader('ACTION', true);
        await updateSupplier(selectedSupplier, supplierData);
        triggerLoader('ACTION', false);
        handleListSuppliers();
        closeBottomSheet();

    };

    const handleRemoveSupplier = async () => {

        triggerLoader('ACTION', true);
        await deleteSupplier(selectedSupplier);
        triggerLoader('ACTION', false);
        handleListSuppliers();
        closeBottomSheet();

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