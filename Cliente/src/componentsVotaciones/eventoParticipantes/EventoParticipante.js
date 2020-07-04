import React, {Fragment, useContext} from 'react';
import Button from '@material-ui/core/Button';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from "components/Grid/GridItem.js";
//import Container from '@material-ui/core/Container';
//import DeleteIcon from '@material-ui/icons/Delete';
//import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
//import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
//import { Grid } from '@material-ui/core';
import Card from "components/Card/Card.js";
import { makeStyles } from "@material-ui/core/styles";
//import { whiteColor } from 'assets/jss/material-dashboard-react';
import eventoContext from '../../context/eventos/eventoContext';
import nominadoContext from '../../context/nominado/nominadoContext';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';



const useStyles = makeStyles((theme) =>({
    prueba: {
           maxWidth: 700,
           backgroundColor: '#1a237e',
           marginTop: "1px",
          
           
    },
  
    paper: {
      marginTop: theme.spacing(-1),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
     
    },
  
    cardTitleWhite: {
      color: "#FFFFFF",
      textAlign: 'center',
      marginTop: theme.spacing(2.5),
      fontSize: "16px",
      textTransform: 'uppercase'
    },
  
    
    botones :{
      height: '50%',
      textAlign:"center"
  
    }
  
      
    
  }))


const EventoParticipante2 = ({eventoparticipante}) => {
    const classes = useStyles();

    const eventosContext = useContext(eventoContext)
    const {eventoActualParticipante} = eventosContext;
    
    const nominadosContext = useContext(nominadoContext);
    const {obtenerNominadosParticipantes, obtenerNominadosVotantes} = nominadosContext

  
    
        //Funcion para agregar el evento actual
       const seleccionarEvento = id =>{
        eventoActualParticipante(id); //Fija un evento actual
        obtenerNominadosParticipantes(id);
        obtenerNominadosVotantes(id)

        
      // agregarNominado();
      //  console.log(id)
       }
    
     
     
   
 //   console.log(eventoparticipante);
      
        return (
            <Fragment>
              <div className={classes.paper}>
                <Card className ={classes.prueba}>
                  <GridContainer >
                    
                    <GridItem  xs={12} sm={12} md={5} >
                      <p className={classes.cardTitleWhite}>{eventoparticipante.nombre}</p>       
                    </GridItem> 

                    <GridItem  xs={12} sm={12} md={7} >
                    <p className= {classes.botones}>
                      <Button
                      variant="contained" 
                      color="secondary"
                      startIcon={<PeopleAltOutlinedIcon />}
                      size = "small"
                      title="Ver Nominados"                                           
                      onClick = {()=> seleccionarEvento(eventoparticipante._id)}
                      >
                      </Button> 
                      </p>
                    </GridItem>    
                  </GridContainer>
                </Card>
              </div>
            </Fragment>
          );
}
 
export default EventoParticipante2;