import React from "react";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import "assets/css/material-dashboard-react.css?v=1.8.0";

// core components

import Login from './componentsVotaciones/Auth/Login';
import NuevaCuenta from './componentsVotaciones/Auth/nuevaCuenta';
import RutaPrivada from './componentsVotaciones/rutas/RutaPrivada'
import Participantes from "layouts/Participantes.js";
import Auditor from "layouts/Auditor.js";
import Nominado from "layouts/Nominado.js";

import AuthState from './context/autenticacion/authState';
import AlertaState from './context/alerta/alertaState';
import EventoState from './context/eventos/eventoState'
import NominadoState from './context/nominado/nominadoState'
import VotoState from './context/voto/votoState'
import tokenAuth from  './config/tokenAuth';


//Revisar si tenemos un token
const token = localStorage.getItem('token');
if(token){
  tokenAuth(token);
}

//console.log(process.env.REACT_APP_BACKEND_URL);
//console.log(token)


function App(){
    return(
        <EventoState>
          <NominadoState>
            <VotoState>
              <AlertaState>
                <AuthState>
                  <Router>
                    <Switch>
                      <Route exact path="/" component={Login}/>
                      <Route exact path="/nueva-cuenta" component={NuevaCuenta}/>
                      <RutaPrivada path="/participantes" component={Participantes} />
                      <RutaPrivada path="/auditor" component={Auditor} />
                      <RutaPrivada path="/nominado" component={Nominado} />
                    </Switch>
                  </Router>
                 </AuthState>
                </AlertaState>
            </VotoState>
          </NominadoState>
        </EventoState>
          
    )
    
}


export default App;


