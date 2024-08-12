"use client";

import './cardAdmin.css';
import { ReactElement, useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { FaCheck, FaInfo } from 'react-icons/fa';
import { GenericAlert } from '../alert/alert';

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
    const [errorState, setErrorState] = useState(false)
    const [successState, setSuccessState] = useState(false)
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
        const res = await fetch(`http://localhost:8080/api/deleteRestaurant/${restaurantID}`);
        window.location.reload();
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
    }

    /* const editRestaurant = async (restaurantID: number) => {
        await fetch(`http://localhost:8080/api/reserveRestaurant/${restaurantID}`);
        window.location.reload();
    } */

    return (
        <Table striped bordered hover>
            <GenericAlert showModal={errorState} theme={'danger'} text={'Não foi possível concluir a tarefa corretamente.'} className='mt-3 alert-center-top'>
                <FaInfo/>
            </GenericAlert>
            <GenericAlert showModal={successState} theme={'success'} text={'O espaço foi deletado com sucesso.'} className='mt-3 alert-center-top'>
                <FaCheck/> 
            </GenericAlert>
        <thead>
            <tr>
                <th>Nome</th>
                <th>Reservas dispníveis</th>
                <th colSpan={2}>Ações</th>
            </tr>
        </thead>
        <tbody>
            {restaurants.length > 0
            ?  restaurants.map((restaurant) => (
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
            ))
            : <></>}
        </tbody>
    </Table>
    );
}

interface TablePlacesProps{
    isLogged: boolean
}

export function TablePlaces(props: TablePlacesProps): ReactElement {
    const [errorState, setErrorState] = useState(false)
    const [successState, setSuccessState] = useState(false)
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
        const res = await fetch(`http://localhost:8080/api/deleteSpace/${spaceID}`);
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
    }

    return (
        <Table striped bordered hover>
            <GenericAlert showModal={errorState} theme={'danger'} text={'Não foi possível concluir a tarefa corretamente.'} className='mt-3 alert-center-top'>
                <FaInfo/>
            </GenericAlert>
            <GenericAlert showModal={successState} theme={'success'} text={'O espaço foi deletado com sucesso.'} className='mt-3 alert-center-top'>
                <FaCheck/> 
            </GenericAlert>
        <thead>
            <tr>
                <th>Nome</th>
                <th>Descrição</th>
                <th colSpan={2}>Ações</th>
            </tr>
        </thead>
        <tbody>
            {places.length > 0 
            ? places.map((place) => (
                <tr key={place.id}>
                    <td>{place.name}</td>
                    <td>{place.description}</td>
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
            ))
            : <></>}
        </tbody>
    </Table>
    );
}

function userIsStranger(): true | PromiseLike<true> {
    throw new Error('Function not implemented.');
}
