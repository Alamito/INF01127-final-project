"use client";

import './cardAdmin.css';
import { useEffect, useState } from 'react';
import Image from 'next/image';

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

    const deleteRestaurant = async (restaurantID: number) => {
        await fetch(`http://localhost:8080/api/deleteRestaurant/${restaurantID}`);
        window.location.reload();
    }

    /* const editRestaurant = async (restaurantID: number) => {
        await fetch(`http://localhost:8080/api/reserveRestaurant/${restaurantID}`);
        window.location.reload();
    } */

    return (
        <div className="container-card-geral">
        {restaurants.map((restaurant) => (
            <div className="container-card-restaurant" key={restaurant.id}> {}
                <div>
                    <Image src={`/${restaurant.source_image}`} alt='Restaurante' width={300} height={200} />
                </div>
                <div className="container-description-restaurant">
                    <h2>{restaurant.name}</h2>
                    <span className="total-tables-available">Reservations available <strong>{restaurant.total_tables - restaurant.tables_reserved}</strong></span>
                </div>
                <div className="container-buttons-restaurant">
                    <button onClick={() => deleteRestaurant(restaurant.id)} className={`button-delete-restaurant`}>
                        <span>Delete</span>
                    </button>
                    <button className={`button-edit-restaurant`}>
                        <span>Edit</span>
                    </button>
                </div>
            </div>
        ))}
    </div>
);
}
