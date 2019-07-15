import React, { useEffect, useState } from 'react';
import Error from './error';
import axios from 'axios';
import Characters from './characters';


function ConsumirApi() {

    const [ personajes, guardarPersonajes ] = useState([]);


    useEffect(() => {
        const consultarApi = async (url) => {
            const resultado = await fetch(url);
            const persona = await resultado.json();
            
            //guardarPersonajes(resultado.data.results);
            //console.log(resultado.data.results[0].name);

                 persona.results.forEach(function(element) {
                    guardarPersonajes(personajes.push(element.name)); 

            });

            if (persona.next != null) {
                consultarApi(persona.next);
            }  


        }
        consultarApi('https://swapi.co/api/people');
    }, []); 



console.log(personajes);




    return (
        <div></div>
/*         <Characters 
        characters={personajes}
        /> */
    )

}
export default ConsumirApi;