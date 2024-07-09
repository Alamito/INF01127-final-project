"use client";

import "./home.css";
import { Card } from "@/view/components/card/card";
import campoDeFutebol from "@/assets/campo_de_futebol.jpeg";

export const Home = () => {
    return (
        <div className="container-home">
            <h1>Home</h1>
            <div className="container-cards">
                <Card title="Card 1" description="Descrição 1" image={campoDeFutebol} />
                <Card title="Card 1" description="Descrição 1" image={campoDeFutebol} />
                <Card title="Card 1" description="Descrição 1" image={campoDeFutebol} />
            </div>
        </div>
    );
}
