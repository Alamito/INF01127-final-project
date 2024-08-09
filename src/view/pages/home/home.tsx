import "./home.css";
import { _Card } from "@/model/class/card";
import { getServerSession } from "next-auth";
import CardRestaurant from "@/view/components/cardRestaurant/cardRestaurant";
import { CardPlace } from "@/view/components/card/cardPlace";
import { Col, Container, Row } from "react-bootstrap";

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
            <CardRestaurant isLogged={session?.user?.name ? true : false}/>
            <div className="separator"></div>
            <Container style={{ width: '70%' }} className='p-5'>
                <h5 className='display-6 mb-4'>Infraestrutura</h5>
                <p className='mb-5 p-1 border-bottom'>O nosso clube conta com diversas areas de lazer perfeitas para aproveitar com a família e amigos.</p>
                <CardPlace/>
            </Container>
        </div>
    );
}
