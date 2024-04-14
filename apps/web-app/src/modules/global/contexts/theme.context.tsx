import { createContext, useContext, useEffect, useState } from "react"
import { ContextProviderProps, Theme, ThemeProviderState } from "../types/global.types"

const ThemeProviderContext = createContext<ThemeProviderState>({} as ThemeProviderState)

export function ThemeProvider({ children }: ContextProviderProps) {

    const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('@stocksys-theme') as Theme) || 'light')

    useEffect(() => {
        const root = window.document.documentElement
        root.classList.remove('light', 'dark')
        root.classList.add(theme)
    }, [theme])

    const value = {
        theme,
        setTheme: (theme: Theme) => {
            localStorage.setItem('@stocksys-theme', theme)
            setTheme(theme)
        },
    }

    return (
        <ThemeProviderContext.Provider value={value}>
            {children}
        </ThemeProviderContext.Provider>
    )
}

export const useTheme = () => {

    return useContext(ThemeProviderContext);

}