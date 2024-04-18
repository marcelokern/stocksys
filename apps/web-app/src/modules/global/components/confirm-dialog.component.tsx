import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { ConfirmDialogComponentPropsType } from "../types/global.types";

const ConfirmDialog = ({
    visible,
    closeBottomSheet,
    title,
    description,
    actionLoader,
    confirmAction
}: ConfirmDialogComponentPropsType) => {

    return (

        <Sheet open={visible} onOpenChange={closeBottomSheet}>

            <SheetContent side={'bottom'} className="rounded-lg p-16 flex flex-col gap-3">

                <h1 className="text-4xl font-light flex flex-row items-center mb-6">{title}</h1>

                <span>{description}</span>

                <div className='flex flex-row gap-3 mt-6'>
                    <Button loading={actionLoader} onClick={confirmAction}>Continuar</Button>
                    <Button variant={'outline'} onClick={() => closeBottomSheet()}>Cancelar</Button>
                </div>

            </SheetContent>

        </Sheet>

    );

}

export default ConfirmDialog;