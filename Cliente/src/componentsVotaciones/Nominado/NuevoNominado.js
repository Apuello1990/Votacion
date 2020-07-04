/*eslint-disable*/
import React, {useContext, useEffect, useState} from 'react';
import eventoContext from '../../context/eventos/eventoContext';
import nominadoContext from '../../context/nominado/nominadoContext';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
//import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

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
      
    },
    cardTitleWhite: {
        color: "#000000",
        textAlign: 'center',
        marginTop: theme.spacing(2.5),
        fontSize: "20px",
        textTransform: 'uppercase'
      },
  }));

  


const NuevoNominado = () => {
    const classes = useStyles(); 
    
    //Extraer si un presupuesto esta activo
    const eventosContext = useContext(eventoContext)
    const { cambiarEstado, evento} = eventosContext;
   
    //Obtener la funcion del context de gastos
    const nominadosContext = useContext(nominadoContext);
    const {usuario, obtenerUsuarioNominados, nominadoseleccionado, agregarNominado, validarNominado, obtenerNominados,actualizarNominado, cambiarEstado2 } = nominadosContext

    //effect que detecta si hay un gasto seleccionado

    useEffect(() => {
     if(nominadoseleccionado !== null){
        guardarNominado(nominadoseleccionado)
        
     }else{
        guardarNominado({
        nombre:''
      
      })
    
     }
     obtenerUsuarioNominados()
       
    }, [nominadoseleccionado])


    //state del formulario
    const [nominado, guardarNominado] =useState({
      nombre:'',
      voto: 0
    })

    //Extraer del gasto
    const{nombre} = nominado;

    //Si no hay presupuesto seleccionado 
  //  if(!evento) return null;

    //Array destructuring para extraer el presupuesto actual
    const [eventoActual] = evento


    //Leer los valores del formulario
    const handleChange = e=>{
            guardarNominado({
        ...nominado,
        [e.target.name] : e.target.value
      })
    }

    //Cuando se envie los datos del formulario
    const onSubmit = e =>{
      e.preventDefault();

      //Validar que no esten vacions
      if(nombre.trim()===''){
        validarNominado();
        return;
      }


      //Si es edicion o si es nuevo gasto
      if(nominadoseleccionado === null){
        //Gasto Nuevo
        //Agregar el nuevo gasto al state de gastos
     //   console.log("Nominado: ",usuario._id)
          nominado.evento = eventoActual._id;
       //   console.log("Nominado: ",nominado)
           agregarNominado(nominado);
            }else{
        //actualizar gasto existente
        actualizarNominado(nominado);
   
           }

      //Obtener y filtrar los gastos del presupuesto actual
      obtenerNominados(eventoActual._id);
   


      //Reiniciar el form
      guardarNominado({
        nombre:''
        
      })
    }

    const cambiar = () =>{
      cambiarEstado()
      cambiarEstado2()
      }


   //  console.log(usuario)
    return (  
        <Container component="main" maxWidth="xs">
          <CssBaseline />
            <div className={classes.paper}>
            <Button
            color="secondary"
                onClick = {()=> cambiar()}
                >Regresar a crear Eventos</Button>
            <Typography component="h1" variant="h5">
                  <p className= {classes.cardTitleWhite}><strong>Evento: {evento[0].nombre}</strong> </p>
                   <p className= {classes.cardTitleWhite}>
                    <strong>Agregas Nominados del Evento</strong> <br></br>
                    
                    </p>
                </Typography>
                <form className={classes.form} noValidate onSubmit= {onSubmit}>
               
                    <InputLabel id="rol" htmlFor="nominado">Escoge un Tipo de Usuario*</InputLabel>
                    <Select
                    labelId="Nominado"
                    id="nominado"
                    name="nombre"
                    label="nominado"
                    fullWidth
                    value={nombre}                   
                    onChange= {handleChange}
                    >
                     {usuario.map((name) => (
                     <MenuItem key={name._id} value={name.nombre}>
                     {name.nombre}
                     </MenuItem>
                    
                                    ))} 
                    

                    </Select>
                    {/* <TextField
                    required 
                    fullWidth
                    autoFocus
                    variant="outlined"
                    margin="normal"
                    type="text"
                    label="Nominado"
                    name="nombre"
                    value= {nombre}
                    onChange= {handleChange}
                    /> */}
                  

                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    
                   
                         >
                    {nominadoseleccionado ? 'Editar Nominado' : 'Registrar Nominado'}
                    </Button>
            
                
                </form>
            </div>
                            
        </Container>
    );
}
 
export default NuevoNominado;