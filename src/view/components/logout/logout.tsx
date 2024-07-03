"use client";

import { signOut } from "next-auth/react";

export const LogOut = () => {
    return (
        <div>
            <button onClick={() => signOut()}>Log Out</button>
        </div>
    );
};
