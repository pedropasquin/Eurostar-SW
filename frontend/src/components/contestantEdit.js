import React, { useState, useRef, useEffect} from 'react';
import Error from "./error";
import axios from 'axios';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';

function ContestantEdit({contestant, history, saveRefreshContestants}) {

    // Destructuring de props
    //const {history, contestant, saveRefreshContestants} = props;

    //generar los refs
    const firstNameRef = useRef('');
    const lastNameRef = useRef('');
    const dateBirthRef = useRef('');
    const mobilePhoneRef = useRef('');
    const contryResidenceRef = useRef('');
    const emailRef = useRef('');
    const starWarsCharacterRef = useRef('');
    const imageRef = useRef('');

    const [ error, saveError ] = useState(0);
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


    const editContestant = async e => {
        e.preventDefault();


        // Obtener los valores del formulario

        const editContestant = {
            FIRST_NAME : firstNameRef.current.value,
            LAST_NAME : lastNameRef.current.value,
            DATE_OF_BIRTH : dateBirthRef.current.value,
            MOBILE_PHONE : mobilePhoneRef.current.value,
            COUNTRY_OF_RESIDENCE : contryResidenceRef.current.value,
            EMAIL : emailRef.current.value,
            STAR_WARS_CHARACTER : starWarsCharacterRef.current.value,
            IMAGE : imageRef.current.value

        }



        if (editContestant.FIRST_NAME === '' || editContestant.LAST_NAME === '' || editContestant.DATE_OF_BIRTH === '' || editContestant.MOBILE_PHONE === '' || editContestant.COUNTRY_OF_RESIDENCE === '' ||
            editContestant.EMAIL === '' || editContestant.STAR_WARS_CHARACTER === '' || editContestant.IMAGE === ''){
            saveError(1);
            return;
        }
        console.log(editContestant.COUNTRY_OF_RESIDENCE);

        if(editContestant.COUNTRY_OF_RESIDENCE.toLowerCase() !== 'españa'){
            saveError(2);
            return;
        }
        //debugger;
        const fecha = new Date(editContestant.DATE_OF_BIRTH)
        const hoy = new Date()
        const ed = parseInt((hoy -fecha)/365/24/60/60/1000)
        if (ed < 18) {
            saveError(3);
            return;
        }

        saveError(0);

        // Enviamos el request
        const url = `http://localhost:3977/api/update-contestant/${contestant._id}`

        try {
            const resultado = await  axios.put(url, editContestant)

            console.log(resultado);
            if(resultado.status === 200){
                Swal.fire(
                    'Concursante modificado!',
                    'El concursante ha sido modificado correctamente',
                    'success'
                )
            }
        } catch(error) {
            console.log(error);
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Hubo un error, vuelve a intentarlo!',
            })
        }

            // redirigir al usuario a concursantes ya con los valores modificados

        saveRefreshContestants(true);
        history.push('/contestants');
    }



  return (

      <div className="col-md-8 mx-auto ">
            <h2 className="text-center">Editar Concursante</h2>
            {(error == 0) ? <Error mensaje='Todo esta correcto  ' /> : null}
            {(error == 1) ? <Error mensaje='Todos los campos son obligatorios' /> : null}
            {(error == 2) ? <Error mensaje='Debes ser español' /> : null}
            {(error == 3) ? <Error mensaje='Debes ser mayor de edad' /> : null}
            <form
                className="mt-5"
                onSubmit={editContestant}
                    >
                    <div className="form-group">
                        <label>Nombre</label>
                        <input
                            type="text"
                            className="form-control"
                            name="firstName"
                            placeholder="Nombre del concursante"
                            ref={firstNameRef}
                            defaultValue={contestant.FIRST_NAME}
                        />
                     </div>

                    <div className="form-group">
                        <label>Apellido</label>
                        <input
                            type="text"
                            className="form-control"
                            name="apellido"
                            placeholder="Apellido del  concursante"
                            ref={lastNameRef}
                            defaultValue={contestant.LAST_NAME}
                        />
                    </div>

                    <div className="form-group">
                        <label>Fecha de Nacimiento</label>
                        <input
                            type="text"
                            className="form-control"
                            name="fechaNacimiento"
                            placeholder="AAAA/MM/DD"
                            ref={dateBirthRef}
                            defaultValue={contestant.DATE_OF_BIRTH}
                        />
                    </div>

                    <div className="form-group">
                        <label>Número de Movil</label>
                        <input
                            type="text"
                            className="form-control"
                            name="movil"
                            placeholder="Número del teléfono movil"
                            ref={mobilePhoneRef}
                            defaultValue={contestant.MOBILE_PHONE}
                        />
                    </div>


                    <div className="form-group">
                        <label>País de residencia</label>
                        <input
                            type="text"
                            className="form-control"
                            name="pais"
                            placeholder="País de residencia del concursante"
                            ref={contryResidenceRef}
                            defaultValue={contestant.COUNTRY_OF_RESIDENCE}
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                            <input
                                type="text"
                                className="form-control"
                                name="email"
                                placeholder="Email del  concursante"
                                ref={emailRef}
                                defaultValue={contestant.EMAIL}
                            />
                    </div>

{/*                     <div className="form-group">
                        <label>Personaje de Star Wars</label>
                            <input
                                type="text"
                                className="form-control"
                                name="character"
                                placeholder="Elige un personaje de Star Wars"
                                ref={starWarsCharacterRef}
                                defaultValue={contestant.STAR_WARS_CHARACTER}
                            />
                    </div> */}

                    <div className="form-group">
                        <label>Personaje de Star Wars</label>
                        <select className="form-control" ref={starWarsCharacterRef} id="sel1">
                                <option>{contestant.STAR_WARS_CHARACTER}</option>
                                {
                                Object.keys(personajes).map((oneKey,i)=>{
                                    return (
                                        <option 
                                            key={i}
                                            placeholder="Elige un personaje de Star Wars"
                                            
                                            >{personajes[oneKey]}</option>
                                    )
                                })
                                }
                        </select>  
                    </div> 


                    <div className="form-group">
                        <label>Imagen</label>
                        <input
                            type="text"
                            className="form-control"
                            name="Sube una imagen"
                            placeholder="Sube una imagen"
                            ref={imageRef}
                            defaultValue={contestant.IMAGE}
                        />
                    </div>

                <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3" value="Editar Concursante" />

            </form>
       </div>


)
}
export default withRouter(ContestantEdit);
