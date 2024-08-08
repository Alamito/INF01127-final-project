"use client";
import { _Card } from "@/model/class/card";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardFooter, CardHeader, CardImg, CardText, CardTitle } from "react-bootstrap";

interface Space {
    id: number;
    name: string;
    description: string;
    available: boolean;
    source_image: string;
}

export const CardPlace = () => {

    const [spaces, setSpaces] = useState<Space[]>([]);

    useEffect(() => {
        const fetchSessionAndData = async () => {
            const resSpaces = await fetch("http://localhost:8080/api/spaces");
            const dataSpaces = await resSpaces.json();
            setSpaces(dataSpaces);
        };

        fetchSessionAndData();
    }, []);

    return (
        <div className="d-flex justify-content-around">
            {spaces.map((space) => {
                return (
                    <Card style={{ width: '300px', height: '400px' }}>
                        <CardHeader style={{ height: '200px'}} className=" d-flex justify-content-center align-items-center p-0 border rounded">
                            <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                                <Image 
                                    src={`/${space.source_image}`} 
                                    alt={space.name} 
                                    width={300} 
                                    height={150} 
                                    className="border rounded img-fluid"
                                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                                    />
                            </div>
                        </CardHeader>
                        <CardBody>
                            <CardTitle>{space.name}</CardTitle>
                            <CardText>{space.description}</CardText>
                        </CardBody>
                        <CardFooter>
                        {space.available ? 
                            <Button variant="primary"> Alugar </Button>
                            :
                            <Button variant="danger" disabled> Indisponivel</Button>
                        }
                        </CardFooter>
                    </Card>
                );
            })}
        </div>
    );
};
