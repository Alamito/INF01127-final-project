"use client";

import { getServerSession, Session } from "next-auth";
import { LogOut } from "../logout/logout";
import { Container, Navbar, NavbarBrand, NavbarText, NavbarToggle, NavLink } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCab } from "@fortawesome/free-solid-svg-icons";
import { ReactElement } from "react";

export const NavbarClube = async (): Promise<ReactElement> => {
    const session = await getServerSession();
    console.log(session)
    const userIsEmployee = async (email: string) => {
        const res = await fetch(`http://localhost:8080/api/isEmployee/${email}`);
        const data = await res.json();
        
        return data.isEmployee;
    }  
    return (
        <Navbar className="border-bottom mb-5 p-4 bg-light">
            <Container>
                <NavbarBrand href="/" className="d-flex align-items-center"> 
                    <div style={{ width: '25px'}}>
                        <FontAwesomeIcon icon={faCab} size="lg"/>  
                    </div>
                    
                    <p className="mb-0 ms-2">CliqueClube</p>
                    
                </NavbarBrand>
                <NavbarToggle />
                <Navbar.Collapse className="justify-content-end"/>
                <NavLink href="/" className="mx-2">
                    Home
                </NavLink>
                {await userIsEmployee(session?.user?.email as string) ? (
                    <NavLink href="/admin" className="mx-2">
                        Admin
                    </NavLink>
                ) : (
                        null
                    )}
                {session?.user?.name ? (
                    <>
                    <NavbarText>
                        Olá, <a href="#login">Mark Otto</a>
                    </NavbarText>
                    <LogOut />
                    </>
                    
                ) : (
                    <div className="d-flex align-items-center">
                        <NavLink href="/api/auth/signin" className="mx-2">
                            Log In
                        </NavLink>
                        <NavLink href="/sign_up" className="mx-2">
                            Sign Up
                        </NavLink>
                    </div>
                )}
                
            </Container>
        </Navbar>
    );
}


// ------------- for the asynchonour stuff
// const session = await getServerSession();

// const userIsEmployee = async (email: string) => {
//     const res = await fetch(`http://localhost:8080/api/isEmployee/${email}`);
//     const data = await res.json();
    
//     return data.isEmployee;
// }  

// ----------------------------------------

{/* <div className="container-nav">
<nav>
    <div>
        <a href="/" className="title">
            CliqueClube
        </a>
    </div>
        <div className="container-options">
            <Link href="/">
                Home
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
                    <div>
                        <span>Olá, {session?.user?.name}</span>
                    </div>
                    <LogOut />
                </>
            ) : (
                <div className="container-register">
                    <Link href="/api/auth/signin">
                        Log In
                    </Link>
                    <Link href="/sign_up">
                        Sign Up
                    </Link>
                </div>
            )}
        </div>
</nav>
</div> */}
