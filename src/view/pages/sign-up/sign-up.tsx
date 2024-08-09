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
        type: 'stranger',
        reservations: 0
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
                        <h1 className='display-5 m-4'>Cadastrar-se</h1>
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
                                    Cadastrar
                                </Button>
                            </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}
