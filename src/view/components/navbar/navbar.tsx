import Link from "next/link";
import "./navbar.css";
import { getServerSession } from "next-auth";
import { LogOut } from "../logout/logout";

export const Navbar = async () => {
    const session = await getServerSession();

    const userIsEmployee = async (email: string) => {
        const res = await fetch(`http://localhost:8080/api/isEmployee/${email}`);
        const data = await res.json();
        
        return data.isEmployee;
    }  

    return (
        <div className="container-nav">
            <nav>
                <div className="logo">
                    <a href="/" className="title">
                        CliqueClube
                    </a>
                </div>
                    <div className="container-options">
                        <Link href="/">
                            Início
                        </Link>
                        {await userIsEmployee(session?.user?.email as string) ? (
                            <Link href="/admin">
                                Admin
                            </Link>
                        ) : (
                                null
                            )}
                        {session?.user?.name ? (
                            <>
                                <div className="user-logged">
                                    <span>Olá, {session?.user?.name}</span>
                                </div>
                                <LogOut />
                            </>
                        ) : (
                            <div className="container-register">
                                <Link href="/api/auth/signin">
                                    Entrar
                                </Link>
                            </div>
                        )}
                    </div>
            </nav>
        </div>
    );
}
