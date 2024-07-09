"use client";

import "./card.css";
import Image from "next/image";
import { _Card } from "@/model/class/card";

export const Card = (card: _Card) => {
    return (
        <div className="container-card">
            <div>
                <Image src={card.image} alt={card.title} width={300} height={200} />
            </div>
            <div className="container-description">
                <h2>{card.title}</h2>
                <p>{card.description}</p>
            </div>
            <button className={`button-reserve ${card.unavailable ? "unavailable" : ""}`}><span>{!card.unavailable ? "Reserve" : "Unavailable"}</span></button>
        </div>
    );
};
