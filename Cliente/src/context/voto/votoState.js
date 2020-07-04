import React, {useReducer} from 'react';
import votoContext from './votoContext';
import votoReducer from './votoReducer';
import {
    AGREGAR_VOTO,
} from '../../types';

import clienteAxios from '../../config/axios'

const VotoState = props =>{

    const initialState = {
        voto : 0
       
    }
    
    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer (votoReducer, initialState)

   

    //Agregar nuevo evento
    const agregarVoto = async voto =>{
        
        voto.voto = 1
        console.log(voto);
        try {
            const resultado = await clienteAxios.post('/api/voto', voto);
            console.log(resultado);

            //Insertar el evento en el state
            dispatch({
                type: AGREGAR_VOTO,
                payload: resultado.data
            })
        } catch (error) {
            console.log(error)
            
        }
    }

    
    
    
   

    return (
        <votoContext.Provider
            value = {{
                voto: state.voto,
                agregarVoto   
            }}
        >
            {props.children}
        </votoContext.Provider>
    )
}

export default VotoState;