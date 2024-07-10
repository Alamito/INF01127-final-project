import "./home.css";
import { Card } from "@/view/components/card/card";
import campoDeFutebol from "../../../../public/assets/campo_de_futebol.jpeg";
import { _Card } from "@/model/class/card";
import { getServerSession } from "next-auth";
import CardRestaurant from "@/view/components/cardRestaurant/cardRestaurant";

export const Home = async () => {
    const session = await getServerSession();

    const userIsStranger = async () => {
        const res = await fetch(`http://localhost:8080/api/isStranger/${session?.user?.email}`);
        const data = await res.json();

        if (data.isStranger !== undefined) {
            return data.isStranger;
        }
        
        return true;
    }

    const cards = [{
            title: "Campo de Futebol de 7",
            description: "Campo com grama sintética e iluminação. O espaço contém vestiários, churrasqueira e bar.",
            image: campoDeFutebol,
            unavailable: true || await userIsStranger(),
        }, 
        {
            title: "Campo de Futebol de 11",
            description: "Campo com grama natural e iluminação. O espaço contém vestiários, churrasqueira e bar.",
            image: campoDeFutebol,
            unavailable: false || await userIsStranger(),
        },
        {
            title: "Campo de Futebol de 5",
            description: "Quadra com pisos flutuantes de madeira e iluminação. O espaço contém vestiários.",
            image: campoDeFutebol,
            unavailable: false || await userIsStranger(),
        },
        {
            title: "Card 4",
            description: "Descrição 4",
            image: campoDeFutebol,
            unavailable: false || await userIsStranger(),
        },
        {
            title: "Card 5",
            description: "Descrição 5",
            image: campoDeFutebol,
            unavailable: false || await userIsStranger(),
        }
    ];

    return (
        <div className="container-home">
            <h1 className="title-home">MAKE YOUR RESERVATION</h1>
            <CardRestaurant isLogged={session?.user?.name ? true : false}/>
            <div className="container-cards">
                {cards.map((card: _Card) => (
                    <Card {...card}/>
                ))}
            </div>
        </div>
    );
}
