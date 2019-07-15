import React from 'react';
import  { Link } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';


function ContestantList({contestant, saveRefreshContestants, saveCharacters}) {
  console.log(saveCharacters);

  const deleteContestant = id => {
    console.log('eliminando', id)
    // Eliminar los registros
     
      Swal.fire({
        title: '¿Estas seguro?',
        text: "No podrás recuperarlo!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, borrarlo!',
        cancelButtonText: 'Cancelar'
      }).then( async (result) => {
        if (result.value) {

          // request borrado delete

          const url = `http://localhost:3977/api/delete-contestant/${contestant._id}`


           try {
              const resultado = await  axios.delete(url)
  
              console.log(resultado);
              if(resultado.status === 200){
                Swal.fire(
                  'Borrado!',
                  'El concursante ha sido borrado.',
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


          saveRefreshContestants(true);


        }
      })
  }

  return (
        <li className="list-group-item d-flex justify-content-between align-items-center" >
            <p>
                {contestant.FIRST_NAME} {' '} {contestant.LAST_NAME} {' '}
                [<span className="font-weight-bold">  {contestant.STAR_WARS_CHARACTER} </span>]

            </p>
            <div>
                <Link
                    to={`/contestant/edit/${contestant._id}`}
                    className="btn btn-success mr-2"
                    >Editar
                </Link>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => deleteContestant(contestant._id)}
                 >
                    Eliminar &times;
                  </button>
            </div>
        </li>

)
}
export default ContestantList;
