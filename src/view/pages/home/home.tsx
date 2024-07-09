"use client";

import "./home.css";
import { Card } from "@/view/components/card/card";
import campoDeFutebol from "@/assets/campo_de_futebol.jpeg";
import { _Card } from "@/model/class/card";

export const Home = () => {

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
        }
    ];

    return (
        <div className="container-home">
            <h1>Home</h1>
            <div className="container-cards">
                {cards.map((card: _Card) => (
                    <Card {...card}/>
                ))}
            </div>
        </div>
    );
}
