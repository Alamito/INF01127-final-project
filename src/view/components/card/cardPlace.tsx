"use client";

import { useEffect, useState, ReactElement } from "react";
import Image from "next/image";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { _Card } from "@/model/class/card";
import { GenericAlert } from "../alert/alert";
import { FaCheck, FaInfo } from "react-icons/fa";

interface Space {
    id: number;
    name: string;
    description: string;
    available: boolean;
    source_image: string;
}

export function GridSpaces({isLogged, isStranger}: {isLogged: boolean, isStranger: boolean}) {
    const [spaces, setSpaces] = useState<Space[]>([]);
    const [errorState, setErrorState] = useState(false)
    const [successState, setSuccessState] = useState(false)

    useEffect(() => {
        const fetchSessionAndData = async () => {
            const resSpaces = await fetch("http://localhost:8080/api/spaces");
            const dataSpaces = await resSpaces.json();
            setSpaces(dataSpaces);
        };

        fetchSessionAndData();
    }, []);

    const reserveSpace = async (spaceID: number) => {
        const res = await fetch(`http://localhost:8080/api/reserveSpace/${spaceID}`);
        const data = await res.json();
        setSpaces(spaces.map((space) => {
            if (space.id === spaceID) {
                return {
                    ...space,
                    available: data.available
                };
            }
            return space;
        }));
        console.log(res.status)
        if (res.status === 500) {
            setErrorState(true);
            setTimeout(() => {
                setErrorState(false);
            }, 3000);
        }
    
        if (res.status === 200) {
            setSuccessState(true);
            setTimeout(() => {
                setSuccessState(false);
            }, 3000);
        }
    };

    if (spaces.length > 0) {
        return (
            <Container style={{ width: '70%' }} className='p-5'>
                <GenericAlert showModal={errorState} theme={'danger'} text={'Ops! Não foi possível reservar este espaço.'} className='mt-3 alert-center-top'>
                    <FaInfo/>
                </GenericAlert>
                <GenericAlert showModal={successState} theme={'success'} text={'Tudo certo! O Espaço foi reservado com sucesso!'} className='mt-3 alert-center-top'>
                    <FaCheck/> 
                </GenericAlert>
                <h5 className='display-6 mb-4'>Espaços</h5>
                <p className='mb-5 p-1 border-bottom'>Explore todos os espaços disponíveis no clube para aluguel.</p>
                <Row>
                    {spaces.map((space) => (
                        <Col key={space.id} xs={12} sm={6} md={6} lg={4} className="mb-4 d-flex justify-content-center align-items-center">
                            <SpaceCard 
                                space={space} 
                                reserveSpace={reserveSpace} 
                                isLogged={isLogged}
                                isStranger={isStranger}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
        );
    }

    return <></>;
}

interface SpaceCardProps { 
    space: Space,
    reserveSpace: (spaceID: number) => Promise<void>,
    isLogged: boolean
    isStranger: boolean
}

export function SpaceCard(props: SpaceCardProps): ReactElement {
    return (
        <Card style={{ width: '300px', height: '470px' }} key={props.space.id}>
            <Card.Header style={{ height: '200px' }} className="d-flex justify-content-center align-items-center p-0 border rounded">
                <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                    <Image
                        src={`/${props.space.source_image}`}
                        alt={props.space.name}
                        width={300}
                        height={200}
                        className="border rounded img-fluid"
                        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                    />
                </div>
            </Card.Header>
            <Card.Body>
                <Card.Title>{props.space.name}</Card.Title>
                <Card.Text>{props.space.description}</Card.Text>
            </Card.Body>
            <Card.Footer>
                { !props.isLogged ?  
                <Button variant="primary" disabled>Login Para Reservar</Button>
                    : !props.space.available ?
                        <Button variant="danger" disabled>Alugado</Button>
                        : props.isStranger ?
                            <Button variant="warning" disabled>Associe-se para Alugar</Button>
                            :<Button variant="success" onClick={() => props.reserveSpace(props.space.id)}>Reservar</Button>
            }
            </Card.Footer>
        </Card>
    );
}
