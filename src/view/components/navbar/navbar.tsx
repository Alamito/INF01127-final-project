import Link from "next/link";
import "./navbar.css";

export const Navbar = () => {
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
                        <Link href="/log_in">
                            Log In
                        </Link>
                        <Link href="/sign_up">
                            Sign Up
                        </Link>
                    </div>
            </nav>
        </div>
    );
}
