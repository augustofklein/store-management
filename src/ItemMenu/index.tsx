import Link from "next/link"

interface ItemMenuProps {
    text: string
    icon: any
    url?: string
    className?: string
    onCLick?: (evento: any) => void
}

export default function ItemMenu(props: ItemMenuProps) {

    function renderLink() {

        return(
            <a className={`
                flex flex-col justify-center items-center
                h-20 w-20
                dark:text-gray-200
                ${props.className}
            `}>
                {props.icon}
                <span className={`text-xs font-light`}>
                    {props.text}
                </span>
            </a>
        )

    }

    return(
        <li onClick={props.onCLick} className={`
            hover:bg-gray-100
            dark:hover:bg-gray-800
            cursor-pointer
        `}>
            {props.url ? (
                <Link legacyBehavior href={props.url}>
                    {renderLink()}
                </Link>
            ) : (
                renderLink()
            )}
        </li>
    )

}