import ItemMenu from "@/ItemMenu";
import { useAuth } from "../../../domains/auth";
import { Entry, Exit, ExitIcon, HomeIcon, ProductIcon } from "../Icons";
import Logo from "../Logo";

export default function LateralMenu() {

    const { logout } = useAuth()

    return(
        <aside className={`
            flex flex-col
            bg-gray-200 text-gray-700
            dark:bg-gray-900
        `}>
            <div className={`
                flex flex-col items-center justify-center
                bg-gradient-to-r from-indigo-500 to-purple-800
                h-20 w-20
            `}>
                <Logo/>
            </div>
            <ul className="flex-grow">
                <ItemMenu url="/" text="Home" icon={HomeIcon}/>
                <ItemMenu url="/products" text="Products" icon={ProductIcon}/>
            </ul>
            <ul>
            </ul>
            <ul>
            <ItemMenu
                text="Exit" icon={ExitIcon}
                onCLick={logout}
                className={`
                    text-red-600 dark:text-red-400
                    hover:bg-red-400 hover:text-white
                    dark:hover:text-white
                `}
            />
        </ul>
        </aside>
    )

}