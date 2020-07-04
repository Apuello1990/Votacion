/*eslint-disable*/
import React, {useState, useContext, useEffect, Fragment} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import AlertaContext from '../../context/alerta/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';
import SnackbarContent from "../../components/Snackbar/SnackbarContent";



function Copyright() {
  
 
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Presupuesto.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(12),
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
    marginTop: theme.spacing(6),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },

  card:{
      marginTop:"6rem",
     
      borderRadius:"5%",
      paddingLeft: "2rem",
      paddingRight: "2rem",
      paddingBottom:"2rem",
      boxShadow: "2px 2px 5px #999;"
  },
  

 
}));

const Login = (props) =>{

 

  //extraer los valores del context 
   const alertaContext = useContext(AlertaContext);
   const {alerta, mostrarAlerta} = alertaContext;

  const authContext = useContext(AuthContext);
  const {mensaje, autenticado, iniciarSesion} = authContext;

   //En caso de que el usuario se haya autenticado o registrado o sea un registro duplicado
   
   useEffect(() => {
    
      if(autenticado && usuario.rol === "participantes"){
        props.history.push('/participantes/eventoparticipante');
            
            }else if(autenticado && usuario.rol === "auditor"){
              props.history.push('/auditor/dashboard');
            }
             else if(autenticado && usuario.rol === "nominado"){
            props.history.push('/nominado/events');
          }

        if(mensaje){
          mostrarAlerta(mensaje.msg, mensaje.categoria); 
        }
     
    
  // eslint-disable-next-line
 }, [mensaje, autenticado, props.history, usuario])

  //State para iniciar sesion
  const [usuario, guardarUsuario] = useState({
    rol:'',
    email:'',
    password:'',

})


//extraer de usuario
const {rol, email, password} = usuario;

const onChange= e => {
  guardarUsuario({
      ...usuario,
      [e.target.name] : e.target.value
  })

}

//Cuando el usuario quiere iniciar sesion
const onSubmit =e=>{
  e.preventDefault();


//Validar que no halla campos vacios
if(rol.trim()==='' || email.trim()==='' || password.trim()===''){
  mostrarAlerta('Todos los campos son obligatorios','danger')
  return;
 }




//Pasarlo al action
iniciarSesion({rol, email, password});
  
}

  const classes = useStyles();
 

  return (

    <Container component="main" maxWidth="xs">
       <CssBaseline />
       
       <div className={classes.paper}>
        {alerta ? ( 
          <SnackbarContent
              classes ={classes.alerta}
              message={
                
                alerta.msg
              }
              color= {alerta.categoria}
              close
              
            />)
            :null
            }
      
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Iniciar Sesión
        </Typography>
        
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          
        <FormControl fullWidth  variant="outlined" >
        <InputLabel id="rol">Tipo de Usuario*</InputLabel>
        <Select
          labelId="rol"
          id="rol"
          name="rol"
          label="Rol"
          fullWidth
          value={rol}
          onChange= {onChange}
        >
          
          <MenuItem value="participantes">Participantes</MenuItem>
          <MenuItem value="auditor">Auditor</MenuItem>
          <MenuItem value="nominado">Nominado</MenuItem>
         
        </Select>
        </FormControl>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo Electronico"
            name="email"
            autoComplete="email"
            onChange= {onChange}
            
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
            onChange= {onChange}
          />
          
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Recordar"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
           
          >
            Iniciar Sesion
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Olvidó su contraseña?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/nueva-cuenta" variant="body2">
                {"No tienes una cuenta? Registrate"}
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

  
  export default Login;