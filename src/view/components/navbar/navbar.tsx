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
                    </div>
            </nav>
        </div>
    );
}
