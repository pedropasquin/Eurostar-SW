import React, { useEffect, useState } from 'react';
import Error from './error';
import axios from 'axios';
import Characters from './characters';

function ConsumirApi() {

    const [ personajes, guardarPersonajes ] = useState([]);

    useEffect(() => {
        var lista = [];
        const consultarApi = async (url) => {
            const resultado = await fetch(url);
            const persona = await resultado.json();
            
                 persona.results.forEach(function(element) {
                    lista.push(element.name); 
            });

            if (persona.next != null) {
                consultarApi(persona.next);
            }  else {
                guardarPersonajes(lista);
            }

        }
        consultarApi('https://swapi.co/api/people');
    }, []); 

    return (

        <div>
            <select className="form-control" id="sel1">
                <option>Elige un personaje: </option>
                    {
                    Object.keys(personajes).map((oneKey,i)=>{
                        return (
                            <option key={i}>{personajes[oneKey]}</option>
                        )
                    })
                    }
            </select>  
        </div>        
    )
}
export default ConsumirApi;

