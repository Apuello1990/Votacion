import React, {useReducer} from 'react';
import NominadoContext from './nominadoContext';
import NominadoReducer from  './nominadoReducer';

import {
    NOMINADOS_EVENTO,
    AGREGAR_NOMINADO,
    VALIDAR_NOMINADO,
    ELIMINAR_NOMINADO,
    ACTUALIZAR_NOMINADO,
    NOMINADO_ACTUAL,
    CAMBIAR_ESTADO2,
    OBTENER_USUARIOS,
    NOMINADOS_EVENTO2,
    ACTUALIZAR_NOMINADO2,
    VERIFICAR   

} from '../../types/index'

import clienteAxios from '../../config/axios';


const NominadoState = props =>{
    const initialState={
        nominadosEvento:[],
        nominadoEventoParticipante:[],
        errornominado: false,
        nominadoseleccionado: null,
        usuario: [],
        nominadosEvento2:[],
        nominadoEventoVoto:[]
    }

    //Crear dispatch y state
    const[state, dispatch] = useReducer(NominadoReducer, initialState);

    //Crear las funciones

    //Obtener los gastos de un presupuesto
    const obtenerNominados = async evento =>{
        try {
            const resultado = await clienteAxios.get('/api/nominados', {params: {evento}});
         //   console.log(resultado)
            dispatch({
                type: NOMINADOS_EVENTO,
                payload: resultado.data.nominados
            })
        } catch (error) {
            console.log(error)
           
        }
    }


     //Obtener los gastos de un presupuesto
     const obtenerNominadosParticipantes = async evento =>{        
        try {
            const resultado = await clienteAxios.get('/api/nominadosParticipantes', {params: {evento}});
           // console.log(resultado)
            dispatch({
                type: NOMINADOS_EVENTO2,
                payload: resultado.data.nominados
            })
        } catch (error) {
            console.log(error)
           
        }
    }


    const obtenerNominadosVotantes = async evento =>{        
        try {
            const resultado = await clienteAxios.get('/api/verificar', {params: {evento}});
         //   console.log(resultado)
            dispatch({
                type: VERIFICAR,
                payload: resultado.data.eventos
            })
        } catch (error) {
         //   console.log(error)
           
        }
    }

   
    //Agregar gastos al presupuesto seleccionado
    const agregarNominado = async nominado =>{
      //  console.log(nominado)
      //  nominado.voto= 0
        try {
            const resultado = await clienteAxios.post('/api/nominados', nominado);
            console.log(resultado);
            dispatch({
                type: AGREGAR_NOMINADO,
                payload: nominado
            })
        } catch (error) {
            console.log(error)
        }
    }


    //Valida y muestra un error en caso de que sea necesario
    const validarNominado = () =>{
        dispatch({
            type: VALIDAR_NOMINADO
        })
    }


    //Eliminar un gasto de un presupuesto por id
    const eliminarNominado= async (id, evento) => {
        try {
            await clienteAxios.delete(`/api/nominados/${id}`, {params:{evento}});
            dispatch({
                type: ELIMINAR_NOMINADO,
                payload: id
            })
        } catch (error) {
            console.log(error)
        }
    }




    //Actualizar y/o editar el gasto seleccionado
    const actualizarNominado = async nominado =>{
        try {
            const resultado = await clienteAxios.put(`/api/nominados/${nominado._id}`, nominado);
         //   console.log(resultado)
            dispatch({
                type: ACTUALIZAR_NOMINADO,
                payload: resultado.data.nominado
            })
        } catch (error) {
            console.log(error)
        }
    }

     //Actualizar y/o editar el gasto seleccionado
     const actualizarNominadoVotacion = async nominado =>{
         
      //   console.log(nominado)
        try {
            const resultado = await clienteAxios.put(`/api/voto/${nominado._id}`, nominado);
            console.log(resultado)
            dispatch({
                type: ACTUALIZAR_NOMINADO2,
                payload: resultado.data.nominado
            })
        } catch (error) {
            console.log(error)
        }
    }

    //Extrae un gasto para su edicion
    const guardarNominadoActual = nominado =>{
        dispatch({
            type: NOMINADO_ACTUAL,
            payload: nominado
        })
    }

    const cambiarEstado2 = () =>{
        console.log("Aquiiii")
        dispatch({
            type: CAMBIAR_ESTADO2,
           
        })
    }


     const obtenerUsuarioNominados = async () =>{
         try {
             const resultado = await clienteAxios.get('/api/usuarios');
          //   console.log(resultado)
             dispatch({
                 type : OBTENER_USUARIOS,
                 payload: resultado.data.usuarios
             })
         } catch (error) {
          console.log(error)
            
         }
    }

    return(
        <NominadoContext.Provider
        value ={{
            nominadosEvento: state.nominadosEvento,
            errornominado: state.errornominado,
            nominadoseleccionado: state.nominadoseleccionado,
            usuario: state.usuario,
            nominadoEventoParticipante: state.nominadoEventoParticipante,
            nominadoEventoVoto:state.nominadoEventoVoto,
            obtenerNominados,
            agregarNominado,
            validarNominado,
            eliminarNominado,
            actualizarNominado,
            guardarNominadoActual,
            cambiarEstado2,
            obtenerUsuarioNominados,
            obtenerNominadosParticipantes,
            actualizarNominadoVotacion,
            obtenerNominadosVotantes
        }}
      
        
        >
            {props.children}
        </NominadoContext.Provider>
    )
}

export default NominadoState;
