import "./admin.css"
import { _Card } from "@/model/class/card";
import { getServerSession } from "next-auth";
import TableRestaurant, { TablePlaces } from '@/view/components/adminTables/adminTables'
import { Button, Container } from 'react-bootstrap';

export const Admin = async () => {
    const session = await getServerSession();

    return (
        <div className="container-home">
            <h1 className="display-1 m-5">Administrador</h1>
            <div className="separator"></div>
            <Container>
            <h5 className='display-6 mb-4 align-self-start'>Restaurantes</h5>
            <TableRestaurant isLogged={session?.user?.name ? true : false}/>
            <div className="d-flex justify-content-center align-items-center">
                <Button variant="link">
                    <a href="/addspace">
                        Adicionar Espaço
                    </a>
                </Button>  
            </div>  
            </Container>
            <div className="separator"></div>
            <Container>
            <h5 className='display-6 mb-4 align-self-start'>Infraestrutura</h5>
            <TablePlaces isLogged={session?.user?.name ? true : false}/>
            <div className="d-flex justify-content-center align-items-center">
                <Button variant="link">
                    <a href="/addspace">
                        Adicionar Espaço
                    </a>
                </Button>  
            </div>
  
            </Container>

        </div>
    );
}
