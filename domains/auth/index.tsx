import {
  useState,
  createContext,
  useContext,
  useCallback,
  useMemo,
} from "react";
import route from "next/router";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AUTH_COOKIE } from "@/utils/authConstant";

interface AuthContextProps {
  user?: string;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout?: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

function gerenciarCookie(token: string) {
  if (token !== null) {
    Cookies.set(`${AUTH_COOKIE}`, token, {
      expires: 7,
    });
  } else {
    Cookies.remove(`${AUTH_COOKIE}`);
  }
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState("");

  const handleShowErrorMessage = useCallback((message: string) => {
    toast.error(message);
  }, []);

  async function configSession(token: string) {
    if (token !== "") {
      gerenciarCookie(token);
    } else {
      gerenciarCookie("");
    }
  }

  const login = useCallback(
    async (username: string, password: string) => {
      try {
        setLoading(true);

        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_API}/v1/auth`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }

        const data = await response.json();

        configSession(data.token);
        setUser(username);

        route.push("/");
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "An unexpected error occurred during login";
        //TODO: VERIFY TO RETURN THE ERROR MESSAGE FROM ENDPOINT
        handleShowErrorMessage("Username or password incorrect!");
      } finally {
        setLoading(false);
      }
    },
    [handleShowErrorMessage, user]
  );

  const logout = useCallback(async () => {
    try {
      setLoading(true);
      setUser("");
      await configSession("");
    } finally {
      setLoading(false);
    }
  }, [user]);

  const authMemo = useMemo(
    () => ({
      user,
      loading,
      login,
      logout,
    }),
    [loading, login, logout, user]
  );

  return (
    <AuthContext.Provider value={authMemo}>
      <ToastContainer />
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
