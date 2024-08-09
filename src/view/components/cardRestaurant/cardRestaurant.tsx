"use client";

import { ReactElement, useEffect, useState } from 'react';
import Image from 'next/image';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';

interface Restaurant {
    id: number;
    name: string;
    total_tables: number;
    tables_reserved: number;
    available: boolean;
    source_image: string;
}

export default function CardRestaurant({isLogged}: {isLogged: boolean}) {

    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

    useEffect(() => {
        const fetchSessionAndData = async () => {
            const resRestaurants = await fetch("http://localhost:8080/api/restaurants");
            const dataRestaurants = await resRestaurants.json();
            setRestaurants(dataRestaurants);
        };

        fetchSessionAndData();
    }, []);

    const reserveRestaurant = async (restaurantID: number) => {
        await fetch(`http://localhost:8080/api/reserveRestaurant/${restaurantID}`);
        window.location.reload();
    }
    
    if (restaurants.length > 0){
        console.log(restaurants.length)
        return (
            <Container style={{ width: '70%' }} className='p-5'>
            <h5 className='display-6 mb-4'>Restaurantes</h5>
            <p className='mb-5 p-1 border-bottom'>O nosso clube conta com diversos restaurantes que representam diferentes cozinhas ao redor do mundo.</p>
            <Row>
                {restaurants.map((restaurant) => (
                    <Col key={restaurant.id} xs={12} sm={6} md={6} lg={4} className="mb-4 d-flex justify-content-center align-items-center">
                        <RestaurantCard 
                            restaurant={restaurant} 
                            reserveRestaurant={reserveRestaurant} 
                            isLogged={isLogged} 
                        />
                    </Col>
                ))}
            </Row>
        </Container>
        );
    }
}

interface RestaurantCardProps { 
    restaurant: Restaurant,
    reserveRestaurant:  (restaurantID: number) => Promise<void>,
    isLogged: boolean
}


export function RestaurantCard ( props: RestaurantCardProps): ReactElement {

    return (    
    <Card style={{ width: '300px', height: '400px' }} key={props.restaurant.id}>
        <Card.Header style={{ height: '200px' }} className="d-flex justify-content-center align-items-center p-0 border rounded">
            <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                <Image
                    src={`/${props.restaurant.source_image}`}
                    alt='Restaurante'
                    width={300}
                    height={200}
                    className="border rounded img-fluid"
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />
            </div>
        </Card.Header>
        <Card.Body>
            <Card.Title>{props.restaurant.name}</Card.Title>
            <Card.Text>
                Mesas livres: <strong>{props.restaurant.total_tables - props.restaurant.tables_reserved}</strong>
            </Card.Text>
        </Card.Body>
        <Card.Footer>
            {props.restaurant.available && (props.restaurant.tables_reserved < props.restaurant.total_tables) && props.isLogged ? (
                <Button variant="primary" onClick={() => props.reserveRestaurant(props.restaurant.id)}>Reserve</Button>
            ) : (
                <Button variant="danger" disabled>Indisponivel</Button>
            )}
        </Card.Footer>
    </Card>)
}
