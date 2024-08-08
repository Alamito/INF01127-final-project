"use client";

import './cardAdmin.css';
import { ReactElement, useEffect, useState } from 'react';
import Image from 'next/image';
import { Button, Table } from 'react-bootstrap';
import campoDeFutebol from "../../../../public/assets/campo_de_futebol.jpeg";

interface Restaurant {
    id: number;
    name: string;
    total_tables: number;
    tables_reserved: number;
    available: boolean;
    source_image: string;
}

export default function TableRestaurant({isLogged}: {isLogged: boolean}) {

    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

    useEffect(() => {
        const fetchSessionAndData = async () => {
            const resRestaurants = await fetch("http://localhost:8080/api/restaurants");
            const dataRestaurants = await resRestaurants.json();
            setRestaurants(dataRestaurants);
        };

        fetchSessionAndData();
    }, []);

    const deleteRestaurant = async (restaurantID: number) => {
        await fetch(`http://localhost:8080/api/deleteRestaurant/${restaurantID}`);
        window.location.reload();
    }

    /* const editRestaurant = async (restaurantID: number) => {
        await fetch(`http://localhost:8080/api/reserveRestaurant/${restaurantID}`);
        window.location.reload();
    } */

    return (
        <Table striped bordered hover>
        <thead>
            <tr>
                <th>Nome</th>
                <th>Reservas dispníveis</th>
                <th colSpan={2}>Ações</th>
            </tr>
        </thead>
        <tbody>
            {restaurants.map((restaurant) => (
                <tr key={restaurant.id}>
                    <td>{restaurant.name}</td>
                    <td>{restaurant.total_tables - restaurant.tables_reserved}</td>
                    <td style={{ width: '150px'}}>
                        <Button variant="danger" onClick={() => deleteRestaurant(restaurant.id)} className="me-2">
                            Delete
                        </Button>
                    </td>
                    <td style={{ width: '150px'}}>
                        <Button variant="primary">
                            Edit
                        </Button>
                    </td>
                </tr>
            ))}
        </tbody>
    </Table>
);
}

// --------------------- Mock information about cards

const cards = [{
    title: "Campo de Futebol de 7",
    description: "Campo com grama sintética e iluminação. O espaço contém vestiários, churrasqueira e bar.",
    image: campoDeFutebol,
    unavailable: true,
}, 
{
    title: "Campo de Futebol de 11",
    description: "Campo com grama natural e iluminação. O espaço contém vestiários, churrasqueira e bar.",
    image: campoDeFutebol,
    unavailable: false,
},
{
    title: "Campo de Futebol de 5",
    description: "Quadra com pisos flutuantes de madeira e iluminação. O espaço contém vestiários.",
    image: campoDeFutebol,
    unavailable: false,
},
{
    title: "Card 4",
    description: "Descrição 4",
    image: campoDeFutebol,
    unavailable: false,
},
{
    title: "Card 5",
    description: "Descrição 5",
    image: campoDeFutebol,
    unavailable: false,
},
];

// ----------------------

interface TablePlacesProps{
    isLogged: boolean
}

export function TablePlaces(props: TablePlacesProps): ReactElement {

    return (
        <Table striped bordered hover>
        <thead>
            <tr>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Disponível</th>
                <th colSpan={2}>Ações</th>
            </tr>
        </thead>
        <tbody>
            {cards.map((card, index) => (
                <tr key={index}>
                    <td>{card.title}</td>
                    <td>{card.description}</td>
                    <td>{card.unavailable}</td>
                    <td style={{ width: '150px'}}>
                        <Button variant="danger" className="me-2">
                            Delete
                        </Button>
                    </td>
                    <td style={{ width: '150px'}}>
                        <Button variant="primary">
                            Edit
                        </Button>
                    </td>
                </tr>
            ))}
        </tbody>
    </Table>
);
}

function userIsStranger(): true | PromiseLike<true> {
    throw new Error('Function not implemented.');
}
