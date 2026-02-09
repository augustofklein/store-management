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
import { useToastMessageService } from "../error-message";
import { returnErrorMessage } from "@/utils/apiClient";

interface AuthContextProps {
  loading: boolean;
  loginByCompany: (
    user: string,
    password: string,
    companyId: number,
  ) => Promise<void>;
  logout?: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

function manageTokenCookie(token: string) {
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
  const { showErrorMessage } = useToastMessageService();

  async function configSession(token: string) {
    if (token !== "") {
      manageTokenCookie(token);
    } else {
      manageTokenCookie("");
    }
  }

  const loginByCompany = useCallback(
    async (user: string, password: string, companyId: number) => {
      try {
        setLoading(true);

        const credentials = btoa(`${user}:${password}`);
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_API}/v1/auth/token`,
          {
            method: "POST",
            headers: {
              Authorization: `Basic ${credentials}`,
              "X-Company-Id": companyId.toString(),
            },
          },
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }

        const data = await response.json();

        configSession(data.accessToken);

        route.push("/");
      } catch (error) {
        showErrorMessage(returnErrorMessage(error));
      } finally {
        setLoading(false);
      }
    },
    [showErrorMessage],
  );

  const logout = useCallback(async () => {
    try {
      setLoading(true);
      await configSession("");
    } finally {
      setLoading(false);
    }
  }, []);

  const authMemo = useMemo(
    () => ({
      loading,
      logout,
      loginByCompany,
    }),
    [loading, logout, loginByCompany],
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
