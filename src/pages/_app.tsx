import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "../../domains/auth";
import { AppProvider } from "../../domains/theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </AuthProvider>
  )
}
