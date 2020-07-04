/*eslint-disable*/
import React, {useContext, useEffect, useState} from 'react';
import Evento from './Evento';
import eventoContext from '../../context/eventos/eventoContext';
import AlertaContext from '../../context/alerta/alertaContext';
import SnackbarContent from "../../components/Snackbar/SnackbarContent";
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import { Alert, AlertTitle } from '@material-ui/lab';



const ListadoEvento = () => {
      
     //Extraer proyectos del state inicial
     const eventosContext = useContext(eventoContext);
     const {mensaje,
            eventosParticipantes,
            eventos, 
            obtenerEventos, 
            obtenerEventosParticipantes} = eventosContext;
    
     const alertaContext = useContext(AlertaContext);
     const {alerta, mostrarAlerta} = alertaContext;

    

     //Obtener presupuestos cuando carga el componente
    useEffect(() => {
        //Si hay un error
             if(mensaje){
                mostrarAlerta(mensaje.msg, mensaje.categoria);
                console.log(mensaje.msg)
             }
            obtenerEventos();
            obtenerEventosParticipantes();
             
          // eslint-disable-next-line
        }, [mensaje])

        //Revisar si presupuestos tiene contenido
        
    if(eventos.length === 0) 
    return (
         <Alert severity="error">
         <AlertTitle>Advertencia</AlertTitle>
         <strong>No hay eventos</strong>, comienza creando uno
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
                {eventos.map(evento =>(
                   
                    <CSSTransition
                        key= {evento._id}
                        timeout={200}
                    >
                      <Evento
                            evento = {evento}
                           // actualizarPregunta = {actualizarPregunta}
                        /> 
                    </CSSTransition>
                ))}
            </TransitionGroup>
            


        </div>
     );
}
 
export default ListadoEvento;