"use client";
import './log-in.css';
import React, { useState } from 'react';
import { CiLogin } from "react-icons/ci";
import { signIn } from 'next-auth/react';
import { Button, Card, CardBody, Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap';

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
        console.log('AAAAAAAAAAAAA')
        event.preventDefault();
        signIn('credentials', {
            ...formData,
            callbackUrl: '/',
        });
    }

    return (
    <Container className="content">
        <Row>
            <Col xs={8}>

            </Col>
            <Col xs={4}>
                <Card style={{ marginTop: '20vh', borderRadius: '15px', padding:'20px' }}>
                    <CardBody>
                        <h1 className='display-3 m-4'>Entrar</h1>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="E-mail"
                            className="mb-3 mt-5">
                            <Form.Control type="email" placeholder="name@example.com" onChange={handleInputChange}/>
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingPassword" label="Senha">
                            <Form.Control type="password" placeholder="Senha" onChange={handleInputChange}/>
                        </FloatingLabel>

                        <div className="d-flex flex-column m-5">
                            <Button variant="success" size="lg" className="mb-2" onClick={handleSubmit}>
                                Acessar
                            </Button>
                            <Button variant="link" className="p-0">
                                Cadastrar-se
                            </Button>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    </Container>
    );
};
