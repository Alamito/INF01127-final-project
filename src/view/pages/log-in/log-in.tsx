"use client";
import './log-in.css';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Button, Card, CardBody, Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap';
import Link from 'next/link';
import { GenericAlert } from '@/view/components/alert/alert';
import { FaInfo } from 'react-icons/fa6';

export const LogIn = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [loginError, setLoginError] = useState(false)

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setLoginError(false);
        
        const res = await verifyCredentials();

        if (res.status === 200) {
            const data = await res.json();
            signIn('credentials', {
                ...data.user,
                callbackUrl: '/',
            });
            return;
        }

        console.log(res.status, 'Error');
        if (res.status === 401) {
            setLoginError(true);
            // Set a timeout to reset loginError after 3 seconds
            setTimeout(() => {
                setLoginError(false);
            }, 3000); // 3000 ms = 3 seconds
        } else {
            setLoginError(false);
        }
    };

    const verifyCredentials = async () => {
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        }
        const res = await fetch('http://localhost:8080/api/login', config);

        return res;
    };

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
                            <Form.Control name="email" type="email" placeholder="name@example.com" onChange={handleInputChange}/>
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingPassword" label="Senha">
                            <Form.Control name="password" type="password" placeholder="Senha" onChange={handleInputChange}/>
                        </FloatingLabel>
                        <GenericAlert showModal={loginError} theme={'danger'} text={'Usuário ou senha incorretos.'} className='mt-3'>
                            <FaInfo/>
                        </GenericAlert>
                        <div className="d-flex flex-column m-5">
                            <Button variant="success" size="lg" className="mb-2 btn-lg" onClick={handleSubmit}>
                                Acessar
                            </Button>
                            <div className="d-flex justify-content-center">
                                <Link href="/sign_up">
                                    <Button variant="link" className="p-0">
                                        Cadastrar-se
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    </Container>
    );
};
