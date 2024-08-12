import "./home.css";
import { _Card } from "@/model/class/card";
import { getServerSession } from "next-auth";
import { GridSpaces } from "@/view/components/card/cardPlace";
import { Container } from "react-bootstrap";
import GridRestaurants from "@/view/components/cardRestaurant/cardRestaurant";

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

    return (
        <div className="container-home  bg-white">
            <h1 className="display-1 m-5"> Faça sua Reserva </h1>
            <div className="separator"></div>
            <GridRestaurants isLogged={session?.user?.name ? true : false}/>
            <div className="separator"></div>
            <GridSpaces isLogged={session?.user?.name ? true : false}/>
        </div>
    );
}
