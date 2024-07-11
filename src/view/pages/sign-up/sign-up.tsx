"use client";
import './sign-up.css';
import React, { useState } from 'react';
import { IoMdPerson } from "react-icons/io";

export const SignUp = () => {
    const [formData, setFormData] = useState({
        name: '',
        last_name: '',
        email: '',
        password: '',
        type: 'stranger'
    });

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        }
        await fetch('http://localhost:8080/api/createUser', config);
    };

    return (
        <div className="container-sign-in">
            <input placeholder="Name" name="name" className="input-style" type="text" onChange={handleInputChange}></input>
            <input placeholder="Last Name" name="last_name" className="input-style" type="text" onChange={handleInputChange}></input>
            <input placeholder="Email" name="email" className="input-style" type="text" onChange={handleInputChange}></input>
            <input placeholder="Password" name="password" className="input-style" type="password" onChange={handleInputChange}></input>

            <div className="radio-inputs">
                <label className="radio">
                    <input type="radio" name="type" value="employee" checked={formData.type === 'employee'} onChange={handleInputChange}/>
                    <span className="name">Employee</span>
                </label>
                <label className="radio">
                    <input type="radio" name="type" value="associated" checked={formData.type === 'associated'} onChange={handleInputChange}/>
                    <span className="name">Associated</span>
                </label>
                    
                <label className="radio">
                    <input type="radio" name="type" value="stranger" checked={formData.type === 'stranger'} onChange={handleInputChange}/>
                    <span className="name">Visitor</span>
                </label>
            </div>

            <div className='actions'>
            <button className="button" onClick={handleSubmit}>
                <IoMdPerson />
                <p className="text">Sign Up</p>
            </button>
            </div>

        </div>
    );
}
