"use client";
import { GenericAlert } from '@/view/components/alert/alert';
import './addspace.css';
import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { IoAdd } from 'react-icons/io5';
import { FaCheck, FaInfo } from 'react-icons/fa';

let available_switch = false;
let spaceType = 'space';

export const Addspace = () => {
    const [errorState, setErrorState] = useState(false)
    const [successState, setSuccessState] = useState(false)


    const [formDataSpace, setFormData] = useState({
        name: '',
        description: '',
        available: true,
        source_image: 'assets/default_space.jpeg'
    });

    const [formDataRestaurant, setFormData2] = useState({
        name: '',
        description: '',
        available: true,
        source_image: 'assets/default_restaurant.jpg',
        total_tables: 0,
        tables_reserved: 0
    });

    const [file, setFile] = useState<any>();

    const handleInputChange = (event: any) => {
        let { name, value, files } = event.target;
        
        if (files) {
            setFile(files[0]);
        }
        
        if (name=='source_image'){
            value = "assets/img/"+value.split('\\')[2];
        }
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
        let res
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formDataSpace),
        }
        if (spaceType=='restaurant') {
            config.body = JSON.stringify(formDataRestaurant);
            res = await fetch('http://localhost:8080/api/createRestaurant', config);
        } 
        else if (spaceType=='space') {
            res = await fetch('http://localhost:8080/api/createSpace', config);
        } else {
            return
        }
            

        if (file) {
            const formData = new FormData();
            formData.append('source_image', file);
            await fetch('http://localhost:8080/api/upload', {
                method: 'POST',
                body: formData,
            });
        }
        console.log(res.status)
        if (res.status === 500) {
            setErrorState(true);
            setTimeout(() => {
                setErrorState(false);
            }, 3000);
        }
    
        if (res.status === 201) {
            setSuccessState(true);
            setTimeout(() => {
                setSuccessState(false);
            }, 3000);
        }
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
        <GenericAlert showModal={errorState} theme={'danger'} text={'Não foi possível concluir a tarefa corretamente.'} className='mt-3 alert-center-top'>
            <FaInfo/>
        </GenericAlert>
        <GenericAlert showModal={successState} theme={'success'} text={'O espaço foi inserido corretamente.'} className='mt-3 alert-center-top'>
            <FaCheck/> 
        </GenericAlert>
        <h1 className="display-1">Cadastro de Espaço</h1>
        <div className="separator"></div>
        <input placeholder="Nome" name="name" className="input-style" type="text" onChange={handleInputChange} required></input>
        <input placeholder="Descrição" name="description" className="input-style" type="text" onChange={handleInputChange}></input>

        <input placeholder="Imagem" name="source_image" className="input-style" type="file" accept="assets/*" onChange={handleInputChange}></input>

        { <label className='checkbox d-flex align-items-center justify-content-center'>
            <input type = "checkbox" name="available" onChange={handleInputChange}></input>
            <p className='my-0 mx-2'>Disponível</p>
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

        <Button onClick={handleSubmit}>
            <Row>
                <Col className='d-flex align-items-center justify-content-center'>
                    <IoAdd className='icone'/>
                </Col>
                <Col style={{paddingLeft: '0'}} className='p-2'>
                    Adicionar
                </Col>
            </Row>
            
            
        </Button>

    </div>
    );
}
