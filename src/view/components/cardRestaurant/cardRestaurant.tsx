"use client";

import './cardRestaurant.css';
import { useEffect, useState } from 'react';
import restaurant1 from '@/assets/restaurant1.jpg';
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

    const reserveRestaurant = async (restaurantID: number) => {
        await fetch(`http://localhost:8080/api/reserveRestaurant/${restaurantID}`);
        window.location.reload();
    }

    return (
        <div className="container-card-restaurant">
        {restaurants.map((restaurant) => (
            <div key={restaurant.id}> {}
                <div>
                    <Image src={`/${restaurant.source_image}`} alt='Restaurante' width={300} height={200} />
                </div>
                <div className="container-description-restaurant">
                    <h2>{restaurant.name}</h2>
                    <span className="total-tables-available">Reservations available <strong>{restaurant.total_tables - restaurant.tables_reserved}</strong></span>
                </div>
                <button onClick={() => reserveRestaurant(restaurant.id)} className={`button-reserve-restaurant ${restaurant.available && !isLogged ? "unavailable" : ""}`}>
                    <span>{restaurant.available && isLogged ? "Reserve" : "Unavailable"}</span>
                </button>
            </div>
        ))}
    </div>
);
}
