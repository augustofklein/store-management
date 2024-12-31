import Image from 'next/image'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { useEffect } from 'react'
import { useAuth } from '../../../../domains/auth'
import loadingGif from '../../../../public/images/loadingGif.gif'

interface ForceAuthenticationProps {
    children?:any
}

export default function ForceAuthentication(props: ForceAuthenticationProps) {

    const { loading, user } = useAuth()
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/authentication");
        }
    }, [loading, user, router]);

    function renderizeContent() {
        return(
            <>
                <Head>
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                                if(!document.cookie?.includes("store-management-auth")) {
                                    window.location.href = "/authentication"
                                }  
                            `
                        }}
                    />
                </Head>
                {props.children}
            </>
        )
    }

    function rendirezeLoading() {
        return(
            <div className={`
                flex justify-center items-center h-screen
            `}>
                <Image src={loadingGif} alt=""/>
            </div>
        )
    }

    if(!loading && user) {
        return renderizeContent()
    } else if (loading) {
        return rendirezeLoading()
    } else {
        return null
    }

}