import React,{useContext, Fragment} from 'react'
import NuevoEvento from '../../componentsVotaciones/evento/NuevoEvento'
import eventoContext from '../../context/eventos/eventoContext';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import { makeStyles } from "@material-ui/core/styles";
import Card from "components/Card/Card.js";
import CardAvatar from "components/Card/CardAvatar.js";
import avatar from "assets/img/faces/presupuesto3.png";
//import { boxShadow } from 'assets/jss/material-dashboard-react';
//import { Container } from '@material-ui/core';
import ListadoEvento from '../../componentsVotaciones/evento/ListadoEvento';
import ListadoNominado from '../../componentsVotaciones/Nominado/ListadoNominado'
import NuevoNominado from '../../componentsVotaciones/Nominado/NuevoNominado'




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


const Eventos = () => {

  const eventosContext = useContext(eventoContext)
  const { nuevapagina} = eventosContext;


  const classes = useStyles();
    return(
      <div>
        {!nuevapagina
        ?(
          <Fragment>
     
      <GridContainer  >
      <GridItem xs={12} sm={12} md={6}>
     <Card className={classes.root} > 
     <CardAvatar profile>
        <a href="#pablo" onClick={e => e.preventDefault()}>
          <img src={avatar} alt="..." />
        </a>
      </CardAvatar>
      <br></br>
      <NuevoEvento/>
      <br></br>
      </Card>            
      </GridItem>
    
      <GridItem xs={12} sm={12} md={6}>
      <div className= {classes.paper}>
      <h3><strong>Listado de Eventos</strong></h3>
      <ListadoEvento/>

      </div>
      </GridItem>
      </GridContainer>
      </Fragment>
        )
        :
        (
          <Fragment>
       
         <GridContainer>
           
          <GridItem xs={12} sm={12} md={6}>
          <Card>
              <NuevoNominado/>
              </Card>
          </GridItem>
          
          <GridItem xs={12} sm={12} md={6}>
            <Card>
          <div className= {classes.paper2}>
            <h3 className={classes.h3}><strong>Listado de Nominados</strong></h3><br></br>
            
          <ListadoNominado/>
          </div>
          </Card>
          </GridItem>
          
        </GridContainer>
   
        </Fragment>
        )
        }
      </div>
      );
}
 
export default Eventos;