import React, { useEffect, useState } from 'react';
import Error from './error';
import axios from 'axios';

function ConsumirApi2() {

    const [ personajes, guardarPersonajes ] = useState([]);


    useEffect(() => {
        const consultarApi = async () => {
            const resultado = await axios.get('https://swapi.co/api/people');
            
            guardarPersonajes(resultado.data.results);
        }
        consultarApi();
    }, []); 


    return (

        <a className="dropdown-item" href="#">Personajes</a>
    )

}
export default ConsumirApi2;
