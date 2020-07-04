import React, {useContext, useEffect} from 'react';
import EventoParticipante2 from './EventoParticipante';
import eventoContext from '../../context/eventos/eventoContext';
import AlertaContext from '../../context/alerta/alertaContext';
import SnackbarContent from "../../components/Snackbar/SnackbarContent";
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import { Alert, AlertTitle } from '@material-ui/lab';

const ListadoEventoParticipante = () => {
 
        
          //Extraer proyectos del state inicial
     const eventosContext = useContext(eventoContext);
     const {mensaje,
            eventosParticipantes,  obtenerEventosParticipantes} = eventosContext;
    
     const alertaContext = useContext(AlertaContext);
     const {alerta, mostrarAlerta} = alertaContext;

    

     //Obtener presupuestos cuando carga el componente
    useEffect(() => {
        //Si hay un error
             if(mensaje){
                mostrarAlerta(mensaje.msg, mensaje.categoria);
              //  console.log(mensaje.msg)
             }
           
            obtenerEventosParticipantes();
             
          // eslint-disable-next-line
        }, [mensaje])

        //Revisar si presupuestos tiene contenido
        
    if(eventosParticipantes.length === 0) 
    return (
         <Alert severity="error">
         <AlertTitle>Advertencia</AlertTitle>
         <strong>No hay eventos</strong>
        </Alert>
     ) 

 
    // console.log(eventosParticipantes)
 

    return( 
        <div>
             {alerta ? ( 
            <SnackbarContent
                message={
                alerta.msg
                }
                color= {alerta.categoria}
                close
            />)
            :null
            } 
             <TransitionGroup>
                {eventosParticipantes.map(eventoparticipante =>(
                   
                    <CSSTransition
                        key= {eventoparticipante._id}
                        timeout={200}
                    >
                      <EventoParticipante2
                            eventoparticipante = {eventoparticipante}
                           // actualizarPregunta = {actualizarPregunta}
                        /> 
                    </CSSTransition>
                ))}
            </TransitionGroup>
            


        </div>
    
    );
}
 
export default ListadoEventoParticipante;