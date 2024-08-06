"use client";
import './addspace.css';
import React, { useState } from 'react';
import { IoAdd } from 'react-icons/io5';

let available_switch = true;
let spaceType = 'space';

export const Addspace = () => {

    const [formDataSpace, setFormData] = useState({
        name: '',
        description: '',
        available: true,
        source_image: 'assets/campo_de_futebol.jpeg'
    });

    const [formDataRestaurant, setFormData2] = useState({
        name: '',
        description: '',
        available: true,
        source_image: 'assets/restaurant1.jpg',
        total_tables: 0,
        tables_reserved: 0
    });

    const handleInputChange = (event: any) => {
        let { name, value } = event.target;
        if (name=='available'){
            available_switch = !available_switch;
            value = available_switch;
        }
        if (name!='total_tables')
            setFormData({...formDataSpace, [name]: value});
        else
            value = parseInt(value);
        setFormData2({...formDataRestaurant, [name]: value});
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formDataSpace),
        }
        if (spaceType=='restaurant') {
            config.body = JSON.stringify(formDataRestaurant);
            await fetch('http://localhost:8080/api/createRestaurant', config);
        } 
        else if (spaceType=='space')
            await fetch('http://localhost:8080/api/createSpace', config);
    };

    const updateForm = async (event: any) => {
        let { name, value } = event.target;
        spaceType = value;
        if (spaceType=='space')
            document.getElementById('tables')!.hidden=true;
        else if (spaceType=='restaurant')
            document.getElementById('tables')!.hidden=false;
    }

    return (
        <div className="container-sign-in">
        <h1 className="title-space-register">Cadastro de Espaço</h1>
        <input placeholder="Nome" name="name" className="input-style" type="text" onChange={handleInputChange} required></input>
        <input placeholder="Descrição" name="description" className="input-style" type="text" onChange={handleInputChange}></input>

        { <label className='checkbox'>
            <input type = "checkbox" name="available" onChange={handleInputChange}></input>
            <h1>Disponível</h1>
        </label>}
{         
        <div className="radio-inputs">
            <label className="radio">
                <input type="radio" name="type" value="space" onChange={updateForm}/>
                <span className="name">Espaço</span>
            </label>
            <label className="radio">
                <input type="radio" name="type" value="restaurant" onChange={updateForm}/>
                <span className="name">Restaurante</span>
            </label>
        </div>
        }

        <input className="input-style" placeholder="Total de Mesas" hidden id='tables' name="total_tables" type="number" min={1} style={{width: '175px'}} onChange={handleInputChange}></input>

        <div className='actions'>
        <button className="button" onClick={handleSubmit}>
            <IoAdd className='icone'/>
            <p className="text">Adicionar</p>
        </button>
        </div>

    </div>
    );
}