"use client";
import './addspace.css';
import React, { useState } from 'react';
import { IoAdd } from 'react-icons/io5';

export const Addspace = () => {

    const [formDataSpace, setFormData] = useState({
        name: '',
        description: '',
        available: true,
        source_image: 'assets/campo_de_futebol.jpeg'
    });

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormData({...formDataSpace, [name]: value});
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formDataSpace)
        }
        await fetch('http://localhost:8080/api/createSpace', config);
    };
    return (
        <div className="container-sign-in">
        <h1 className="title-space-register">Space Register</h1>
        <input placeholder="Name" name="name" className="input-style" type="text" onChange={handleInputChange}></input>
        <input placeholder="Description" name="description" className="input-style" type="text" onChange={handleInputChange}></input>

        {/* { <label className='checkbox'>
            <input type = "checkbox" name="available" onChange={handleInputChange}></input>
            <h1>Available</h1>
        </label>} */}
{         
        // <div className="radio-inputs">
        //     <label className="radio">
        //         <input type="radio" name="type" value="space" checked={formDataSpace.type === 'space'} onChange={handleInputChange}/>
        //         <span className="name">Space</span>
        //     </label>
        //     <label className="radio">
        //         <input type="radio" name="type" value="restaurant" checked={formDataSpace.type === 'restaurant'} onChange={handleInputChange}/>
        //         <span className="name">Restaurant</span>
        //     </label>
                
        // </div>
        }

        <div className='actions'>
        <button className="button" onClick={handleSubmit}>
            <IoAdd />
            <p className="text">Add</p>
        </button>
        </div>

    </div>
    );
}