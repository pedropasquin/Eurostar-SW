import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from 'axios';
import ContestantEdit from './components/contestantEdit';
import ContestantAdd from './components/contestantAdd';
import Contestant from './components/contestant';
import Contestants from './components/contestants';
import Header from './components/header';
import Login from './components/login';

import ConsumirApi from './components/consumirapi';
import Characters from './components/characters';

function App() {

    const [ contestants, saveConstentants ] = useState([]);
    const [ characters, saveCharacters ] = useState([]);   
    const [ refreshContestants, saveRefreshContestants ] = useState(true);
    

     useEffect(() => {
          if(refreshContestants) {
              const consultarApi = async () => {
              // consultar API
              const resultado = await axios.get("http://localhost:3977/api/list-contestant");
              saveConstentants(resultado.data);


            }



          consultarApi();




           // Cambiar a false la recarga de los productos

           saveRefreshContestants(false);
        }

     }, [refreshContestants]);



  return (

        <Router>
          <Header />
          <main className="container mt-5">
                <Switch>
                    <Route exact path="/contestants"
                            render={ () => (
                            <Contestants
                              contestants={contestants}
                              saveRefreshContestants={saveRefreshContestants}

                              />
                              )}

                    />
                    <Route exact path="/new-contestants"
                        render = {() => (
                            <ContestantAdd
                                characters={characters}
                                saveRefreshContestants = {saveRefreshContestants}
                        />
                        )}/>
                    <Route exact path="/contestant/:id" component={Contestant} />
                    <Route exact path="/consumirapi" component={ConsumirApi} />
                    <Route exact path="/characters" component={Characters} />
                    <Route exact path="/contestant/edit/:id"
                            render={props => {
                                // Cogemos el id del producto
                                const idContestant = props.match.params.id;
                                // el producto que se le pasa al state
                                const contestant = contestants.filter(contestant => contestant._id === idContestant);
                                const firstName = contestant[0].FIRST_NAME;
                                return (
                                    <ContestantEdit
                                        contestant={contestant[0]}
                                        saveRefreshContestants={saveRefreshContestants}
                                    />
                                )
                            }} />

                </Switch>
          </main>
            <p  className="mt-4 p2 text-center">Todos los derechos reservados</p>
        </Router>
  );
}

export default App;
