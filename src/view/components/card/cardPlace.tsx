"use client";
import { _Card } from "@/model/class/card";
import Image from "next/image";
import { Button, Card, CardBody, CardFooter, CardHeader, CardImg, CardText, CardTitle } from "react-bootstrap";

export const CardPlace = (props: _Card) => {
    return (
        
        <Card style={{ width: '300px', height: '400px' }}>
            <CardHeader style={{ height: '200px'}} className=" d-flex justify-content-center align-items-center p-0 border rounded">
                <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                    <Image 
                        src={props.image} 
                        alt={props.title} 
                        width={300} 
                        height={150} 
                        className="border rounded img-fluid"
                        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                    />
                </div>
            </CardHeader>
            <CardBody>
                <CardTitle>{props.title}</CardTitle>
                <CardText>{props.description}</CardText>
            </CardBody>
            <CardFooter>
            {props.unavailable ? 
                <Button variant="danger" disabled> Indisponivel</Button>
                :
                <Button variant="primary"> Alugar </Button>
                }
            </CardFooter>
        </Card>
    );
};
