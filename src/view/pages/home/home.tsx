import "./home.css";
import campoDeFutebol from "../../../../public/assets/campo_de_futebol.jpeg";
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
            <h1 className="display-1 mb-5"> Faça sua Reserva </h1>
            <div className="separator"></div>
            <CardRestaurant isLogged={session?.user?.name ? true : false}/>
            <div className="separator"></div>
            <Container style={{ width: '70%' }} className='p-5'>
                <h5 className='display-6 mb-4'>Infraestrutura</h5>
                <p className='mb-5 p-1 border-bottom'>O nosso clube conta com diversar areas de lazer perfeitas para aproveitar com a família e amigos.</p>
                <Row>
                    {cards.map((card: _Card, index) => (
                        <Col key={index} xs={12} sm={6} md={6} lg={4} className="mb-4 d-flex justify-content-center align-items-center">
                            <CardPlace key={index} {...card}/>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}
