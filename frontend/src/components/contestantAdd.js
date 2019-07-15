import React, {useState, useEffect} from 'react';
import Error from './error';
import axios from 'axios';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';
import Actor from './actor';
import ContestantList from './contestantList';

function ContestantAdd({ history, saveRefreshContestants, characters, saveCharacters, contestants}) {
   
   





    //state
    const [ FIRST_NAME, saveName ] = useState('');
    const [ LAST_NAME, saveLastName ] = useState('');
    const [ DATE_OF_BIRTH, saveDayBirth ] = useState('');
    const [ MOBILE_PHONE, saveMobilePhone ] = useState('');
    const [ COUNTRY_OF_RESIDENCE, saveCountryResidence ] = useState('');
    const [ EMAIL, saveEmail ] = useState('');
    const [ STAR_WARS_CHARACTER, saveCharacter ] = useState('');
    const [ IMAGE, saveImage ] = useState('');
    const [ error, saveError ] = useState(0);
    const [ name ] = useState('');
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


    const addContestant = async e => {
        e.preventDefault();


        if (FIRST_NAME === '' || LAST_NAME === '' || DATE_OF_BIRTH === '' || MOBILE_PHONE === '' || COUNTRY_OF_RESIDENCE === '' ||
            EMAIL === '' || STAR_WARS_CHARACTER === '' || IMAGE === ''){
            saveError(1);
            return;
        }
        if(COUNTRY_OF_RESIDENCE != 'España'){
            saveError(2);
            return;
        }
        //debugger;
        const fecha = new Date(DATE_OF_BIRTH)
        const hoy = new Date()
        const ed = parseInt((hoy -fecha)/365/24/60/60/1000)
        if (ed < 18) {
            saveError(3);
            return;
        }

        saveError(0);

        // Crear nuevo producto

        try {
            const resultado = await  axios.post('http://localhost:3977/api/register-contestant', {
                FIRST_NAME,
                LAST_NAME,
                DATE_OF_BIRTH,
                MOBILE_PHONE,
                COUNTRY_OF_RESIDENCE,
                EMAIL,
                STAR_WARS_CHARACTER,
                IMAGE
            });

        

            console.log(resultado);
            if(resultado.status === 200){
                Swal.fire(
                    'Concursante creado!',
                    'El concursante ha sido creado correctamente',
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
        // Redirigisr al usuario
        saveRefreshContestants(true);
        history.push('/contestants');
    }


  return (
        <div className="col-md-8 mx-auto ">
            <h2 className="text-center">Añadir Nuevo Concursante</h2>
            {(error == 1) ? <Error mensaje='Todos los campos son obligatorios' /> : null}
            {(error == 2) ? <Error mensaje='Debes ser español' /> : null}
            {(error == 3) ? <Error mensaje='Debes ser mayor de edad' /> : null}
            <form
            className="mt-5"
                onSubmit={addContestant}
                >
                <div className="form-group">
                      <label>Nombre</label>
                      <input
                          type="text"
                          className="form-control"
                          name="firstName"
                          placeholder="Nombre del concursante"
                          onChange={e => saveName(e.target.value)}
                      />
                </div>

                <div className="form-group">
                      <label>Apellido</label>
                      <input
                          type="text"
                          className="form-control"
                          name="apellido"
                          placeholder="Apellido del  concursante"
                          onChange={e => saveLastName(e.target.value)}
                          />
                </div>

                 <div className="form-group">
                    <label>Fecha de Nacimiento</label>
                    <input
                        type="text"
                        className="form-control"
                        name="fechaNacimiento"
                        placeholder="AAAA/MM/DD"
                        onChange={e => saveDayBirth(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Número de Movil</label>
                    <input
                        type="text"
                        className="form-control"
                        name="movil"
                        placeholder="Número del teléfono movil"
                        onChange={e => saveMobilePhone(e.target.value)}
                    />
                </div>


                  <div className="form-group">
                    <label>País de residencia</label>
                    <input
                        type="text"
                        className="form-control"
                        name="pais"
                        placeholder="País de residencia del concursante"
                        onChange={e => saveCountryResidence(e.target.value)}
                    />
                   </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="text"
                            className="form-control"
                            name="email"
                            placeholder="Email del  concursante"
                            onChange={e => saveEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Personaje de Star Wars</label>
                        <select className="form-control" id="sel1" onChange={e => saveCharacter(e.target.value)}>
                                <option>Elige un personaje: </option>
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
                            onChange={e => saveImage(e.target.value)}
                        />
                    </div>

                    <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3" value="Añadir Concursante" />
                </form>
        </div>
  )
}
export default withRouter(ContestantAdd);
