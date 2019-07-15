import React, { useEffect, useState } from 'react';
import Error from './error';
import axios from 'axios';
import Characters from './characters';


function ConsumirApi() {

    const [ personajes, guardarPersonajes ] = useState([]);


    useEffect(() => {
        const consultarApi = async () => {
            const resultado = await axios.get('https://swapi.co/api/people');
            
            guardarPersonajes(resultado.data.results);
        }
        consultarApi();
    }, []); 

            

    return (

        <Characters 
        characters={personajes}
        />
    )

}
export default ConsumirApi;