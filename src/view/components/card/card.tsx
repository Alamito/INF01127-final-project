"use client";

import "./card.css";
import Image from "next/image";

export const Card = ({ title, description, image }: { title: string, description: string, image: any }) => {
    return (
        <div className="container-card">
            <div>
                <Image src={image} alt={title} width={300} height={200} />
            </div>
            <div className="container-description">
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
            <button className="button-reserve"><span>Reserve</span></button>
        </div>
    );
};
