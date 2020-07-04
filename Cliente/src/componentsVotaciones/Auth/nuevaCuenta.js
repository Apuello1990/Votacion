import React, {useState, useContext, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AuthContext from '../../context/autenticacion/authContext';
//import AlertaContext from '../../context/alerta/alertaContext';
//import SnackbarContent from "../../components/Snackbar/SnackbarContent";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
//import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Truequeo.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(8),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
   
  },
}));


const NuevaCuenta = (props) =>{

  //extraer los valores del context
//   const alertaContext = useContext(AlertaContext);
//   const {alerta, mostrarAlerta} = alertaContext;

  const authContext = useContext(AuthContext);
  const {mensaje, autenticado, registrarUsuario} = authContext;

    //En caso de que el usuario se haya autenticado o registrado o sea un registro duplicado
    useEffect(() => {
      if(autenticado && usuario.rol === "participantes"){
        props.history.push('/participantes/dashboard');
            
            }else if(autenticado && usuario.rol === "auditor"){
              props.history.push('/auditor/dashboard');
            }
             else if(autenticado && usuario.rol === "nominado"){
            props.history.push('/nominado/events');
          }
        // if(mensaje){
        //     mostrarAlerta(mensaje.msg, mensaje.categoria); 
        // }
      
       // eslint-disable-next-line
    }, [mensaje, autenticado, props.history])


  //State para iniciar sesion
  const [usuario, guardarUsuario] = useState({
    rol:'',
    nombre:'',
    email:'',
    password:'',
    confirmar:'',

})

 //extraer de usuario
 const {rol, nombre, email, password, confirmar} = usuario;

 const onChange= e => {
    guardarUsuario({
        ...usuario,
        [e.target.name] : e.target.value
    })

}

//Cuando el usuario quiere crear la cuenta
const onSubmit = e=>{
    e.preventDefault();
     console.log(usuario)
   //Validar que no halla campos vacios
    if(rol.trim()==='' || nombre.trim()==='' || email.trim()==='' || password.trim()==='' || confirmar.trim()===''){
        console.log('Todos los campos son obligatorios');
     //   mostrarAlerta('Todos los campos son obligatorios', 'danger');
        return;
    }

    //Password minimo de 6 caracteres
    if(password.length < 6){
        console.log('El password debe ser al menos de 6 caracteres');
     //   mostrarAlerta('El password debe ser de al menos 6 caracteres','danger')
        return;
    }

    //Los 2 passwords deben ser iguales
    if(password !== confirmar){
        console.log('Los passwords no son iguales');
     //   mostrarAlerta('Los passwords deben ser iguales','danger')
        return;
    }
     
    
    
     //Pasarlo al action
     registrarUsuario({
      rol,
      nombre,
      email,
      password
  });

  
  
}


    const classes = useStyles();

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
        {/* {alerta ? ( 
          <SnackbarContent
             
              message={
                alerta.msg
              }
              
              color={alerta.categoria}
              close
              
            />)
            :null
            } */}
          <Avatar className={classes.avatar}>
          <CreateOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registrate Aquí
          </Typography>
          <form className={classes.form} onSubmit= {onSubmit} noValidate>
            {/* <FormControl fullWidth variant="outlined"> */}
                <InputLabel id="rol">Escoge un Tipo de Usuario</InputLabel>
                    <Select
                    labelId="rol"
                    id="rol"
                    label="Rol"
                    name="rol"
                    value={rol}
                    fullWidth
                    onChange={onChange}
                    >

                    <MenuItem value="participantes">Participantes</MenuItem>
                    <MenuItem value="auditor">Auditor</MenuItem>
                    <MenuItem value="nominado">Nominado</MenuItem>

                    </Select>
            {/* </FormControl> */}
          <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="text"
              label="Tu Nombre"
              name="nombre"
              autoComplete="name"
              value= {nombre}
              onChange={onChange}
              autoFocus
               
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo Electronico"
              name="email"
              autoComplete="email"
              value= {email}
              onChange={onChange}
            
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={onChange}
            />
             <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirmar"
              label="Repite tu contraseña"
              type="password"
              id="confirmar"
              value={confirmar}
              autoComplete="current-password"

              onChange={onChange}
            />
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Registrate
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/" variant="body2">
                  Volver a Iniciar Sesión
                </Link>
              </Grid>
             
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    );
}

export default NuevaCuenta
  
