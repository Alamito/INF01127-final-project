import './admin.css';
import { Card } from "@/view/components/card/card";
import campoDeFutebol from "../../../../public/assets/campo_de_futebol.jpeg";
import { _Card } from "@/model/class/card";
import { getServerSession } from "next-auth";
import CardRestaurant from "@/view/components/cardAdmin/cardAdmin";

export const Admin = async () => {
    const session = await getServerSession();

    return (
        <div className="container-spaces">
            <h1 className="title-admin-spaces">Spaces</h1>
            <a href="/addspace" className="add-space">
                Add Space
            </a>
            <CardRestaurant isLogged={session?.user?.name ? true : false}/>
        </div>
    );
}
