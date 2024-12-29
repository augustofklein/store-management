import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "../../domain/auth";
import { AppProvider } from "../../domain/theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </AuthProvider>
  )
}
