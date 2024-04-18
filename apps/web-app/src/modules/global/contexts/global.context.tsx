import { BottomSheetContentTypes, ContextProviderProps, GlobalProviderState } from "@/modules/global/types/global.types"
import { createContext, useContext, useState } from "react"

const GlobalProviderContext = createContext<GlobalProviderState>({} as GlobalProviderState)

export function GlobalProvider({ children }: ContextProviderProps) {

    const [contentLoader, setContentLoader] = useState<boolean>(false);
    const [actionLoader, setActionLoader] = useState<boolean>(false);
    const [formLoader, setFormLoader] = useState<boolean>(false);
    const [bottomSheetVisible, setBottomSheetVisible] = useState<boolean>(false)
    const [bottomSheetContent, setBottomSheetContent] = useState<BottomSheetContentTypes | undefined>()

    const triggerLoader = (loaderType: 'CONTENT' | 'ACTION' | 'FORM', state: boolean) => {

        switch (loaderType) {
            case 'CONTENT': return setContentLoader(state);
            case 'ACTION': return setActionLoader(state);
            case 'FORM': return setFormLoader(state);
        }

    }

    const openBottomSheet = (content: BottomSheetContentTypes) => {

        setBottomSheetContent(content);
        setBottomSheetVisible(true);

    }

    const closeBottomSheet = () => {

        setBottomSheetVisible(false);
        setBottomSheetContent(undefined);

    }

    const value = {
        contentLoader,
        formLoader,
        actionLoader,
        bottomSheetVisible,
        bottomSheetContent,
        triggerLoader,
        openBottomSheet,
        closeBottomSheet
    }

    return (
        <GlobalProviderContext.Provider value={value}>
            {children}
        </GlobalProviderContext.Provider>
    )
}

export const useGlobal = () => {

    return useContext(GlobalProviderContext);

}