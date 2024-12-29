import UserAvatar from "../UserAvatar"
import Titulo from "../Title"
import { useTheme } from "../../../domain/theme"
import Theme from "../Theme"

interface PageHeaderProps {
    title: string
    subTitle: string
}

export default function PageHeader(props: PageHeaderProps) {

    const { theme, changeTheme } = useTheme()

    return(
        <div className={`flex`}>
            <Titulo title={props.title} subTitle={props.subTitle}/>
            <div className={`flex flex-grow justify-end items-center`}>
                <Theme tema={theme} alternarTema={changeTheme || (() => {})}/>
                <UserAvatar className="ml-3"/>
            </div>
        </div>
    )

}