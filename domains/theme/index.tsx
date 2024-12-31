import { createContext, useContext, useEffect, useState } from "react";
interface AppContextProps {
    theme?: string
    changeTheme?: () => void
}

const AppContext = createContext<AppContextProps>({})

export function AppProvider(props: any) {

    const [theme, setTheme] = useState('dark')

    function changeTheme() {
        const novoTema = theme === '' ? 'dark' : ''
        setTheme(novoTema)
        localStorage.setItem('tema', novoTema)
    }

    useEffect(() => {
        const savedTheme = localStorage.getItem('tema')
        if(savedTheme !== null) {
            setTheme(savedTheme)
        }
    }, [])

    return(
        <AppContext.Provider value={{
            theme,
            changeTheme,
        }}>
            {props.children}
        </AppContext.Provider>
    )

}

export const useTheme = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useTheme must be used within an AppProvider");
    }
    return context;
};