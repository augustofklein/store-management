import Link from 'next/link'

interface UserAvatarProps {
    className?: string
}

export default function AvatarUsuario(props: UserAvatarProps) {

    return(
        <Link href="/perfil">
            <img
                src={'/images/avatar.svg'}
                alt="Avatar do Usuário"
                className={`
                    h-10 w-10 rounded-full cursor-pointer
                    ${props.className}
                `}>
            </img>
        </Link>
    )

}