"use client";
import './log-in.css';
import React, { useState } from 'react';
import { CiLogin } from "react-icons/ci";
import { signIn } from 'next-auth/react';

export const LogIn = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        signIn('credentials', {
            ...formData,
            callbackUrl: '/',
        });
    }


    return (
        <div className="container-log-in">
            <input placeholder="Email" name="email" className="input-style" type="text" onChange={handleInputChange}></input>
            <input placeholder="Password" name="password" className="input-style" type="password" onChange={handleInputChange}></input>

            <div className='actions'>
            <button className="button" onClick={handleSubmit}>
                <CiLogin />
                <p className="text">Log In</p>
            </button>
            </div>

        </div>
    );
};
