"use client";
import './sign-up.css';
import React, { useState } from 'react';
import { Button, Card, CardBody, FloatingLabel, Form } from 'react-bootstrap';

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
            <div className="d-flex align-items-center justify-content-end">
                <Card className="card-sign-in">
                    <CardBody>
                        <h1 className='display-5 m-4'>Registrar-se</h1>
                            <FloatingLabel className="mb-3" controlId="floatingInput" label="Nome">
                                <Form.Control onChange={handleInputChange} name="name" type="text" placeholder="Nome"/>
                            </FloatingLabel>
                            <FloatingLabel className="mb-3" controlId="floatingPassword" label="Sobrenome">
                                <Form.Control onChange={handleInputChange} name="last_name" type="text" placeholder="Sobrenome"/>
                            </FloatingLabel>
                            <FloatingLabel className="mb-3" controlId="floatingPassword" label="E-mail">
                                <Form.Control onChange={handleInputChange} name="email" type="email" placeholder="E-mail"/>
                            </FloatingLabel>
                            <FloatingLabel className="mb-3" controlId="floatingPassword" label="Senha">
                                <Form.Control onChange={handleInputChange} name="password" type="password" placeholder="Senha"/>
                            </FloatingLabel>
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
                                    <span className="name">Stranger</span>
                                </label>
                            </div>
                            <div className="d-flex flex-column m-4">
                                <Button variant="success" size="lg" className="mb-2 btn-lg" onClick={handleSubmit}>
                                    Registrar
                                </Button>
                            </div>
                    </CardBody>
                </Card>
            </div>
            {/* <input placeholder="Name" name="name" className="input-style" type="text" onChange={handleInputChange}></input>
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
                    <span className="name">Stranger</span>
                </label>
            </div>

            <div className='actions'>
            <button className="button" onClick={handleSubmit}>
                <IoMdPerson />
                <p className="text">Sign Up</p>
            </button>
            </div> */}

        </div>
    );
}
