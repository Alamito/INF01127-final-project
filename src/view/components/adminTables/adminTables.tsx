"use client";

import './cardAdmin.css';
import { ReactElement, useEffect, useState } from 'react';
import Image from 'next/image';
import { Button, Table } from 'react-bootstrap';
import campoDeFutebol from "../../../../public/assets/campo_de_futebol.jpeg";
import { FaCheck } from 'react-icons/fa';
import { FaExclamationTriangle } from 'react-icons/fa';

interface Restaurant {
    id: number;
    name: string;
    description: string;
    total_tables: number;
    tables_reserved: number;
    available: boolean;
    source_image: string;
}

interface Place {
    id: number;
    name: string;
    description: string;
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

interface TablePlacesProps{
    isLogged: boolean
}

export function TablePlaces(props: TablePlacesProps): ReactElement {

    const [places, setPlaces] = useState<Place[]>([]);

    useEffect(() => {
        const fetchSessionAndData = async () => {
            const resPlaces = await fetch("http://localhost:8080/api/spaces");
            const dataPlaces = await resPlaces.json();
            setPlaces(dataPlaces);
        };

        fetchSessionAndData();
    }, []);

    const deleteSpace = async (spaceID: number) => {
        await fetch(`http://localhost:8080/api/deleteSpace/${spaceID}`);
        window.location.reload();
    }

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
            {places.map((place) => (
                <tr key={place.id}>
                    <td>{place.name}</td>
                    <td style={{ width: '150px'}}>
                        <Button variant="danger" onClick={() => deleteSpace(place.id)} className="me-2">
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
