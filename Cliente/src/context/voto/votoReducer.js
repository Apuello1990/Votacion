import {
    AGREGAR_VOTO,
} from '../../types';

export default (state, action) => {
    switch(action.type){
                 
    
            case AGREGAR_VOTO:
                console.log(state.voto)
            return {
                ...state,
                voto: [...state.voto, action.payload],
                        
    
            }      
    
        default: 
            return state;
    }
    }