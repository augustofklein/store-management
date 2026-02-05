import Image from "next/image";
import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect } from "react";
import { useAuth } from "../../../../domains/auth";
import loadingGif from "../../../../public/images/loadingGif.gif";
import { AUTH_COOKIE } from "@/utils/authConstant";
import Cookies from "js-cookie";

interface ForceAuthenticationProps {
  children?: any;
}

export default function ForceAuthentication(props: ForceAuthenticationProps) {
  const { loading } = useAuth();
  const router = useRouter();

  //TODO: Adicionar validação para vencimento do token
  useEffect(() => {
    if (!Cookies.get(AUTH_COOKIE)) {
      router.push("/authentication");
    }
  }, [loading, router]);

  function renderizeContent() {
    return (
      <>
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                                if(!document.cookie?.includes("${AUTH_COOKIE}")) {
                                    window.location.href = "/authentication"
                                }  
                            `,
            }}
          />
        </Head>
        {props.children}
      </>
    );
  }

  function rendirezeLoading() {
    return (
      <div
        className={`
                flex justify-center items-center h-screen
            `}
      >
        <Image src={loadingGif} alt="" />
      </div>
    );
  }

  if (!loading) {
    return renderizeContent();
  } else if (loading) {
    return rendirezeLoading();
  } else {
    return props.children;
  }
}
