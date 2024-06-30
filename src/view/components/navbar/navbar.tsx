import Link from "next/link";
import "./navbar.css";
import { getServerSession } from "next-auth";
import { LogOut } from "../logout/logout";

export const Navbar = async () => {
    const session = await getServerSession();

    return (
        <div className="container-nav">
            <nav>
                <div>
                    <a href="" className="text-2x1 font-bold">
                        Nome legal
                    </a>
                </div>
                    <div className="container-options">
                        <Link href="/">
                            Home
                        </Link>
                        <Link href="/admin">
                            Admin
                        </Link>
                        <Link href="/api/auth/signin">
                            Log In
                        </Link>
                        <Link href="/sign_up">
                            Sign Up
                        </Link>
                        {session?.user?.name ? (
                            <>
                                <p>Olá, {session?.user?.name}</p>
                                <LogOut />
                            </>
                        ) : (
                            <>
                                <p>num ta logado</p>
                            </>
                        )}
                    </div>
            </nav>
        </div>
    );
}
