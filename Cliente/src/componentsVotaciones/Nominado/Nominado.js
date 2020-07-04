/*eslint-disable*/
import React, {useContext, Fragment} from 'react';
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
import nominadoContext from '../../context/nominado/nominadoContext';



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
  

const Nominado = ({nominado}) =>{

    const classes = useStyles();

 //Obtener la funcion del context de gastos
 const nominadosContext = useContext(nominadoContext);
 const {eliminarNominado, obtenerNominados, guardarNominadoActual} = nominadosContext
 
 //Extraer si un presupuesto esta activo
 const eventosContext = useContext(eventoContext)
 const { evento} = eventosContext;

 //Extraer el presupuesto
 const [eventoActual] = evento

 //console.log(presupuestoActual.id)

 //Funcion para eliminar el gasto
 const onClickEliminar = id =>{
     eliminarNominado(id, eventoActual._id);
     obtenerNominados(eventoActual._id);
     
 }

 
  
 //Agregar un gasto actual cuando el usuario desee editarlo
 const seleccionarNominado = nominado =>{
    guardarNominadoActual(nominado);
 }

 


 return(

    <Fragment>
  <div className={classes.paper}>
    <Card className ={classes.prueba}>
      <GridContainer >
          <GridItem   xs={12} sm={12} md={5} >
    <p className={classes.cardTitleWhite}>{nominado.nombre}</p>
   
          </GridItem>
         
          <GridItem  className={classes.grid} xs={12} sm={12} md={3} >
          <p className= {classes.botones}>
              <Button
                variant="contained" 
                color="primary"
                startIcon ={<EditOutlinedIcon/>}
                size = "small"
                onClick= {()=>seleccionarNominado(nominado)}
                >
                </Button>
            </p>
          </GridItem>
          <GridItem   className={classes.grid} xs={12} sm={12} md={3} >
          <p className= {classes.botones}>
                <Button
                  variant="contained" 
                  color="secondary"
                  startIcon={<DeleteIcon />}
                  size = "small"
                  onClick = {()=> onClickEliminar(nominado._id)}
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

export default Nominado;