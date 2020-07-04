/*eslint-disable*/
import React, {Fragment, useContext} from 'react';
import Button from '@material-ui/core/Button';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from "components/Grid/GridItem.js";
import Container from '@material-ui/core/Container';
import DeleteIcon from '@material-ui/icons/Delete';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import { Grid } from '@material-ui/core';
import Card from "components/Card/Card.js";
import { makeStyles } from "@material-ui/core/styles";
import { whiteColor } from 'assets/jss/material-dashboard-react';
import eventoContext from '../../context/eventos/eventoContext';
import nominadoContext from '../../context/nominado/nominadoContext'


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
    height: '100%',
    textAlign:"center"

  }

    
  
}))
const Evento = ({evento}) => {

  const classes = useStyles();

const eventosContext = useContext(eventoContext)
const {eventos, eventoActual,eliminarEvento, guardarEventoActual,agregarNominado} = eventosContext;

const nominadosContext = useContext(nominadoContext);
const {obtenerNominados, obtenerNominado} = nominadosContext

    //Funcion para agregar el evento actual
   const seleccionarEvento = id =>{
    eventoActual(id); //Fija un evento actual
    obtenerNominados(id);
    agregarNominado();
   // console.log(id)
   }

   //Elimina un proyecto
const onclickEliminar = id=>{
  eliminarEvento(id);
 // console.log(id)
}

//Agrega una presupuesto actual cuando el usuario desea editarlo
const selectEvento = evento =>{
  guardarEventoActual(evento);
 }

  
    return (
      <Fragment>
  <div className={classes.paper}>
    <Card className ={classes.prueba}>
      <GridContainer >
          <GridItem   xs={12} sm={12} md={5} >
    <p className={classes.cardTitleWhite}>{evento.nombre}</p>
   
          </GridItem>
         
          <GridItem  xs={12} sm={12} md={2} >
            <p className= {classes.botones}>
              <Button
                variant="contained" 
                color="primary"
                startIcon ={<EditOutlinedIcon/>}
                size = "small"
                onClick= {()=>selectEvento(evento)}
                title="Editar"
                >
                
              </Button>
            </p>
          </GridItem>
          <GridItem   xs={12} sm={12} md={2} >
              <p className= {classes.botones}>
                <Button 
                  variant="contained" 
                  color="secondary"
                  startIcon={<DeleteIcon />}
                  size = "small"
                  title="Eliminar"
                  onClick = {()=> onclickEliminar(evento._id)}
                  >
                 
                </Button> 
                </p>
          </GridItem>
          <GridItem   xs={12} sm={12} md={2} >
              <p className= {classes.botones}>
                  <Button
                    variant="contained" 
                    color="secondary"
                    startIcon={<AddCircleOutlinedIcon />}
                    size = "small"
                    title="Agregar Nominados"
                    onClick = {()=> seleccionarEvento(evento._id)}
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
 


export default Evento;
