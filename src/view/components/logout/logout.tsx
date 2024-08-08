"use client";

import { signOut } from "next-auth/react";
import "./logout.css";

export const LogOut = () => {
    return (
        <div className="container-log-out">
            <button onClick={() => signOut()}>Sair</button>
        </div>
    );
};
