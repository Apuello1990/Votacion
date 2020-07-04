import React, {useState, useContext, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import SnackbarContent from "../../components/Snackbar/SnackbarContent";
import eventoContext from '../../context/eventos/eventoContext';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
     
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    boton :{
      backgroundColor: "#1a237e",
      borderRadius: "1rem",
      borderColor: "transparent"
      
    }
  }));

const NuevoEvento = () => {
  
   //Obtener el state del formulario
    

   const eventosContext = useContext(eventoContext)
   const {
            eventoseleccionado,
            errorformulario,
            agregarEvento,
            mostrarError, 
            actualizarEvento, 
            
            } = eventosContext;

     

//   Effect que detecta si hay un evento seleccionado
    useEffect(() => {
      if(eventoseleccionado !== null){
      guardarEvento(eventoseleccionado)
     // console.log(eventoseleccionado)
      }else {
        guardarEvento({
           nombre:''          
     })
      }
     
  }, [eventoseleccionado])

   
   //State para el evento
   const[evento, guardarEvento] = useState({
       nombre:''
      
   });
  
   
    //Extraer valores del state de evento
    const {nombre} = evento

         
    
     
   //Lee los contenidos de los inputs
   const onChangeEvento = e =>{
        guardarEvento({
           ...evento,            
           [e.target.name] : e.target.value,
          
       })

         
   }
   
 

   const onSubmitEvento = e =>{
       e.preventDefault();
     
     //Validar el evento
     if(nombre.trim()===''){
       mostrarError()
         
        return;
     }
     
     //si es edicion o si es un nuevo evento
      if(eventoseleccionado === null){
        //Evento nuevo
        //Agregar el nuevo evento al state de evento
         agregarEvento(evento)
         console.log(evento)
      }else{
        //Actualizar evento axistente
       actualizarEvento(evento);
       //console.log("AQui entro")
   }

   

     //Reiniciar el form
     guardarEvento({
       nombre:''

   })

   }


   
   
  const classes = useStyles(); 
  
    return ( 
        <Container component="main" maxWidth="xs">
        <CssBaseline />
            <div className={classes.paper}>
             
       { errorformulario ? 
           (<SnackbarContent
            classes ={classes.alerta}
            message="El campo es obligatorio"
            color= "danger"
            close
              />) 
            :null
            }   
                <Typography component="h1" variant="h5">
                    Cree su Evento
                </Typography>
                <form className={classes.form} noValidate onSubmit={onSubmitEvento}>
                    <TextField
                    required 
                    fullWidth
                    autoFocus
                    variant="outlined"
                    margin="normal"
                    type="text"
                    label="Nombre del evento"
                    name="nombre"
                    id ="nombre"
                    value= {nombre}
                    onChange= {onChangeEvento}
                    
                   />

                   <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    >
                    {eventoseleccionado ?"Editar Evento":"Registrar Evento"}
                    </Button>

                  
                </form>
            </div>
    </Container>
     );
}
 
export default NuevoEvento;