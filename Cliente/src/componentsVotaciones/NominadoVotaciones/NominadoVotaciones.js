/*eslint-disable*/
import React, {useContext, Fragment, useState} from 'react';
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
import votoContext from '../../context/voto/votoContext'
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import Swal from 'sweetalert2'

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

    grid:{
        position:'absolute'
    },
  
    
    botones :{
      height: '50%',
      textAlign:"center"
  
    }
  
      
    
  }))

const NominadoVotaciones = ({nominadoprueba}) => {
   
    const classes = useStyles();

 //State de votos
 //const[votos, guardarVoto] = useState(1)

 //Obtener la funcion del context de gastos
 const nominadosContext = useContext(nominadoContext);
 const { nominadoEventoParticipante,actualizarNominadoVotacion} = nominadosContext
 
 //Extraer si un presupuesto esta activo
//  const eventosContext = useContext(eventoContext)
//  const { eventoparticipante2} = eventosContext;

// const votosContext = useContext(votoContext)
// const{agregarVoto}= votosContext



 const seleccionarEvento = id =>{
 actualizarNominadoVotacion({"_id": id, "voto":1 })
 // console.log(id)
 Swal.fire(
  'Correcto',
  'El voto se registró correctamente',
  'success'
)

 }

//console.log(nominadoEventoVoto);
/* const validar = () =>{
  if(nominadoEventoVoto === null){
    return false
  }else
    return true
 }*/


 
 const validar = () =>{
    let acum = 0
    nominadoEventoParticipante.forEach(element=>acum += element.voto )
    if(acum > 0){    
     return true
       } else {    
        return false 
      }


 }

    return ( 
        <Fragment>
          <div className={classes.paper}>   
            <Card className ={classes.prueba}>
              <GridContainer >        
                <GridItem   xs={12} sm={12} md={5} >
                  <p className={classes.cardTitleWhite}>{nominadoprueba.nombre}</p>
                </GridItem>  
              
                <GridItem  className={classes.grid} xs={12} sm={12} md={3} >
                 <p className= {classes.botones}>
                  <Button
                  variant="contained" 
                  color="primary"
                  startIcon ={<ThumbUpAltOutlinedIcon/>}
                  size = "small"
                  disabled={validar()}
                  onClick = {()=> seleccionarEvento(nominadoprueba._id)}
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
 
export default NominadoVotaciones;