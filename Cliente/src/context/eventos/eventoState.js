import React, {useReducer} from 'react';
import eventoContext from './eventoContext';
import eventoReducer from './eventoReducer';
import {
    AGREGAR_EVENTO,
    VALIDAR_EVENTO,
    OBTENER_EVENTOS,
    ACTUALIZAR_EVENTO,
    ELIMINAR_EVENTO,
    EVENTO_ERROR,
    EVENTO_ACTUAL,
    NOMINADO_NUEVO,
    CAMBIAR_ESTADO,
    RESET_VALORES,
    OBTENER_EVENTOS2,
    EVENTO_ACTUAL2,
    OBTENER_GRAFICA

} from '../../types';

import clienteAxios from '../../config/axios'

const EventoState = props =>{

    const initialState = {
        eventos : [],
        eventosParticipantes:[],
        errorformulario: false,
        evento: null,
        eventoparticipante2: null,
        nominadoEventoVoto:null,
        mensaje: null,
        eventoseleccionado: null,
        nuevapagina: false,
        restante: 0,
        graficaEventos:[]
    }
    
    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer (eventoReducer, initialState)

    //Serie de funciones para el crud
    //Obtener los eventos
    const obtenerEventos = async () =>{
        try {
            const resultado = await clienteAxios.get('/api/eventos');
           // console.log(resultado)
            dispatch({
                type : OBTENER_EVENTOS,
                payload: resultado.data.eventos
            })
        } catch (error) {
            const alerta = {
                msg:'Hubo un error',
                categoria: 'danger'
            }
            dispatch({
                type: EVENTO_ERROR,
                payload: alerta

            })
            
        }
    }


       //Obtener los eventos participantes
       const obtenerEventosParticipantes = async () =>{
        try {
            const resultado = await clienteAxios.get('/api/eventosParticipantes');
         //   console.log(resultado)
            dispatch({
                type : OBTENER_EVENTOS2,
                payload: resultado.data.eventos
            })
        } catch (error) {
            const alerta = {
                msg:'Hubo un error',
                categoria: 'danger'
            }
            dispatch({
                type: EVENTO_ERROR,
                payload: alerta

            })
            
        }
    }


    //Obtener Grafica
    const obtenerGrafica = async () =>{
        try {
            const resultado = await clienteAxios.get('/api/grafica');
           console.log(resultado)
            dispatch({
                type : OBTENER_GRAFICA,
                payload: resultado.data.nominados
            })
        } catch (error) {
            console.log(error)
            
        }
    }



    //Agregar nuevo evento
    const agregarEvento = async evento =>{
       // console.log(evento)
        try {
            const resultado = await clienteAxios.post('/api/eventos', evento);
            console.log(resultado);

            //Insertar el evento en el state
            dispatch({
                type: AGREGAR_EVENTO,
                payload: resultado.data
            })
        } catch (error) {
            const alerta ={
                msg:'Hubo un error!!',
                categoria: 'danger'
            }
            dispatch({
                type: EVENTO_ERROR,
                payload: alerta
            })
            
        }
    }
    
    //Funcion para mostrar error cuando el nombre de evento  y se de submit
    const mostrarError = () =>{
        dispatch({
            type: VALIDAR_EVENTO
        })
    }

    //Selecciona el evento cuando el usuario le dio click
    const eventoActual = eventoID =>{
        dispatch({
            type: EVENTO_ACTUAL,
            payload: eventoID
        })
    }


      //Selecciona el evento cuando el usuario le dio click
      const eventoActualParticipante = eventoID =>{
        dispatch({
            type: EVENTO_ACTUAL2,
            payload: eventoID
        })
    }

    //Elimina un evento
    const  eliminarEvento = async eventoId =>{
        try {
            await clienteAxios.delete(`/api/eventos/${eventoId}`);
            dispatch({
                type: ELIMINAR_EVENTO,
                payload: eventoId
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'danger'
            }
            dispatch({
                type: EVENTO_ERROR,
                payload: alerta
            })
            
        }
    }

    //Actualizar y/o editar el evento seleccionado
    const actualizarEvento = async evento =>{
        try {
            const resultado = await clienteAxios.put(`/api/eventos/${evento._id}`, evento);
         //   console.log(resultado)
            dispatch({
                type: ACTUALIZAR_EVENTO,
                payload: resultado.data.evento
            })
        } catch (error) {
            console.log(error)
            
        }
    }

    //Extraer un evento para edicion
    const guardarEventoActual = evento =>{
     //   console.log(evento)
        dispatch({
            type: EVENTO_ACTUAL,
            payload: evento
        })
    }


    //Funcion para crear agregar gasto
    const agregarNominado = () =>{
        dispatch({
            type: NOMINADO_NUEVO,
           // payload: presupuesto
        })
    }

    const cambiarEstado = () =>{
        dispatch({
            type: CAMBIAR_ESTADO,
           
        })
    }


    const resetearValores = () =>{
        dispatch({
            type: RESET_VALORES,
           
        })
    }
   

    return (
        <eventoContext.Provider
            value = {{
                eventos: state.eventos,
                evento: state.evento,
                mensaje : state.mensaje,
                errorformulario : state.errorformulario,
                eventoseleccionado: state.eventoseleccionado,
                nuevapagina: state.nuevapagina,
                restante: state.restante,
                eventosParticipantes:state.eventosParticipantes,
                eventoparticipante: state.eventosParticipante,
                graficaEventos: state.graficaEventos,
                obtenerEventos,
                agregarEvento,
                mostrarError,
                eventoActual,
                eliminarEvento,
                actualizarEvento,
                guardarEventoActual,
                agregarNominado,
                resetearValores,
                cambiarEstado,
                obtenerEventosParticipantes,
                eventoActualParticipante,
                obtenerGrafica
                

            }}
        >
            {props.children}
        </eventoContext.Provider>
    )
}

export default EventoState;