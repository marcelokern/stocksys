import { ReactNode } from "react"

export type ContextProviderProps = {
    children: ReactNode
}

export type ViewPropsType<S, H> = {
    state: S,
    handlers: H,
}

export type GlobalProviderState = {
    contentLoader: boolean,
    formLoader: boolean,
    actionLoader: boolean,
    bottomSheetVisible: boolean,
    bottomSheetContent: 'FORM_CREATE' | 'FORM_EDIT' | 'FORM_VIEW' | 'UPDATE_STATUS' | 'CONFIRM_DELETE' | undefined,
    triggerLoader: (loaderType: 'CONTENT' | 'ACTION' | 'FORM', state: boolean) => void,
    openBottomSheet: (content: 'FORM_CREATE' | 'FORM_EDIT' | 'FORM_VIEW' | 'UPDATE_STATUS' | 'CONFIRM_DELETE') => void,
    closeBottomSheet: () => void
}

export type Theme = 'dark' | 'light';

export type ThemeProviderState = {
    theme: Theme
    setTheme: (theme: Theme) => void
}

export type MainContainerPropsType = {
    children: ReactNode
}

export type MainTitleComponentPropsType = {
    title: string[],
    buttons?: ReactNode[]
}

export type TableComponentPropsType<T> = {
    data: T[],
    contentLoader: boolean,
    handleView?: (id: string) => void,
    handleEdit?: (id: string) => void,
    handleUpdateStatus?: (id: string, status: string) => void,
    handleRemove?: (id: string) => void,
}

export type FormComponentPropsType<T> = {
    visible: boolean,
    closeBottomSheet: () => void,
    title: string,
    formLoader: boolean,
    formData: T,
    actionLoader: boolean,
    formAction: (data: T) => void,
    content?: string
}

export type ConfirmDialogComponentPropsType = {
    visible: boolean,
    closeBottomSheet: () => void,
    title: string,
    description: string,
    actionLoader: boolean,
    confirmAction: () => void
}

export type FilterContainerComponentPropsType = {
    title: string,
    children: ReactNode
}