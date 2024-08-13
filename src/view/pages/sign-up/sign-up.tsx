"use client";
import { GenericAlert } from '@/view/components/alert/alert';
import './sign-up.css';
import React, { useState } from 'react';
import { Button, Card, CardBody, FloatingLabel, Form } from 'react-bootstrap';
import { FaCheck, FaInfo } from 'react-icons/fa';

export const SignUp = () => {
    const [formData, setFormData] = useState({
        name: '',
        last_name: '',
        email: '',
        password: '',
        type: 'stranger',
        reservations: 0
    });
    const [signUpError, setSignUpError] = useState(false)
    const [signUpSuccess, setSignUpSuccess] = useState(false)
    
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
        const res = await fetch('http://localhost:8080/api/createUser', config);
        
        console.log(res.status, 'Error')
        if (res.status === 401 || res.status === 500) {
            setSignUpError(true);
            // Set a timeout to reset loginError after 3 seconds
            setTimeout(() => {
                setSignUpError(false);
            }, 3000); // 3000 ms = 3 seconds
        }
        if (res.status === 200 || res.status === 201 ) {
            setSignUpSuccess(true);
            setTimeout(() => {
                setSignUpSuccess(false);
            }, 3000);
        }
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
                            <FloatingLabel className="mb-3" controlId="floatingLastName" label="Sobrenome">
                                <Form.Control onChange={handleInputChange} name="last_name" type="text" placeholder="Sobrenome"/>
                            </FloatingLabel>
                            <FloatingLabel className="mb-3" controlId="floatingEmail" label="E-mail">
                                <Form.Control onChange={handleInputChange} name="email" type="email" placeholder="E-mail"/>
                            </FloatingLabel>
                            <FloatingLabel className="mb-3" controlId="floatingPassword" label="Senha">
                                <Form.Control onChange={handleInputChange} name="password" type="password" placeholder="Senha"/>
                            </FloatingLabel>
                            <div className="radio-inputs">
                                <label className="radio">
                                    <input type="radio" name="type" value="employee" checked={formData.type === 'employee'} onChange={handleInputChange}/>
                                    <span className="name">Empregado</span>
                                </label>
                                <label className="radio">
                                    <input type="radio" name="type" value="associated" checked={formData.type === 'associated'} onChange={handleInputChange}/>
                                    <span className="name">Associado</span>
                                </label>
                                    
                                <label className="radio">
                                    <input type="radio" name="type" value="stranger" checked={formData.type === 'stranger'} onChange={handleInputChange}/>
                                    <span className="name">Visitante</span>
                                </label>
                            </div>
                            <GenericAlert showModal={signUpError} theme={'danger'} text={'Não foi possível criar este usuário.'} className='mt-3'>
                                <FaInfo/>
                            </GenericAlert>
                            <GenericAlert showModal={signUpSuccess} theme={'success'} text={'A sua conta for criada com sucesso!'} className='mt-3'>
                                <FaCheck/>
                            </GenericAlert>
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
