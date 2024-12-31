import { useState, createContext, useContext } from 'react'
import route from 'next/router'
import Cookies from 'js-cookie'

interface AuthContextProps {
    user?: string;
    loading: boolean
    login: (username: string, password: string) => Promise<void>
    logout?: () => Promise<void>
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

function gerenciarCookie(token: string) {
    if(token !== null) {
        Cookies.set('store-management-auth', token,{
            expires: 7
        })
    } else {
        Cookies.remove('store-management-auth')
    }
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [loading, setLoading] = useState(false)
    const [user, setUsername] = useState<string>();

    async function configSession(token: string) {
        if(token !== "") {
            gerenciarCookie(token)
        } else {
            gerenciarCookie("")
        }
    }

    async function login(username: string, password: string) {
        try {
            setLoading(true)

            const authData = {
                Username: username,
                Password: password
            }

            const response = await fetch(`https://store-management-e2eme0hyfxe3buc9.brazilsouth-01.azurewebsites.net/v1/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({username, password}),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Login failed:", errorData);
                throw new Error("Failed to login");
            }

            const data = await response.json();

            configSession(data.token);
            setUsername(username);

            route.push('/')
        } catch {
            // TODO: Adicionar toast de erro
        } finally {
            setLoading(false)
        }
    }

    async function logout() {
        try {
            setLoading(true)
            setUsername("");
            await configSession("")
        } finally {
            setLoading(false)
        }
    }

    return(
        <AuthContext.Provider value={{
            user,
            loading,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};