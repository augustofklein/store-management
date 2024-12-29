import { useTheme } from "../../../domain/theme"
import ForceAuthentication from "../Auth/ForceAuthentication"
import Content from "../Content"
import LateralMenu from "../LateralMenu"
import PageHeader from "../PageHeader"

interface LayoutProps {
    title: string
    subtitle: string
    children?: any
}

export default function Layout(props: LayoutProps) {
    
    const { theme } = useTheme()

    return(
        <ForceAuthentication>
            <div className={`${theme} flex h-screen w-screen`}>
                <LateralMenu />
                <div className={`
                    flex flex-col w-full p-7
                    bg-gray-300 dark:bg-gray-800
                `}>
                    <PageHeader title={props.title} subTitle={props.subtitle}/>
                    <Content>
                        {props.children}
                    </Content>
                </div>
            </div>
        </ForceAuthentication>
    )
}