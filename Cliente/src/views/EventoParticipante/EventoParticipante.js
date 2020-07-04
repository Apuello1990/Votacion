import React,{Fragment} from 'react'
//import eventoContext from '../../context/eventos/eventoContext';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import { makeStyles } from "@material-ui/core/styles";
import Card from "components/Card/Card.js";
//import CardAvatar from "components/Card/CardAvatar.js";
//import avatar from "assets/img/faces/presupuesto3.png";
//import { boxShadow } from 'assets/jss/material-dashboard-react';
//import { Container } from '@material-ui/core';
import ListadoEventoParticipante from '../../componentsVotaciones/eventoParticipantes/ListadoEventoParticipante';
import ListadoNominadoVotaciones from '../../componentsVotaciones/NominadoVotaciones/ListadoNominadoVotaciciones';




const useStyles = makeStyles((theme) =>({
  
  paper: {
    marginTop: theme.spacing(1),   
  },

  paper2: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(5),
    marginRight:theme.spacing(5)
  },

  root: {
   alignItems:"center",
   
   marginTop: "30px",
   boxShadow:"3px 3px 5px 3px #888888"
   
  },
  h3:{
    textAlign:"center"
  }
}));




const EventoParticipante = () => {

  //Extraer si un presupuesto esta activo

   
  
    const classes = useStyles();
      return(
        <div>
          <Fragment>       
            <GridContainer>      
              <GridItem xs={12} sm={12} md={4}>
                <Card>
                    <div className= {classes.paper2}>
                    <h3><strong>Listado de Eventos</strong></h3>
                    <ListadoEventoParticipante/>  
                  </div>
                </Card>
              </GridItem>

              <GridItem xs={12} sm={12} md={6}>
                <Card>
                  <div className= {classes.paper2}>
                  <h3 className={classes.h3}><strong>Listado de Nominados</strong></h3><br></br>
                  <ListadoNominadoVotaciones/>
                  </div>
                </Card>
              </GridItem> 
            </GridContainer>
          </Fragment>
        </div>
      ) 
}
 
export default EventoParticipante;