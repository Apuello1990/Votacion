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
    
  } from '../../types'

export default (state, action) => {
switch(action.type){
   
        case OBTENER_EVENTOS:
           // console.log(action.payload)
        return {
            ...state,
            eventos: action.payload
        }

        case OBTENER_EVENTOS2:
           // console.log(action.payload)
        return {
            ...state,
            eventosParticipantes: action.payload
        }


        case OBTENER_GRAFICA:
           // console.log(action.payload)
        return {
            ...state,
            graficaEventos: action.payload
        }
        
    

        case AGREGAR_EVENTO:
        return {
            ...state,
            eventos: [...state.eventos, action.payload],
            errorformulario: false,
         //   nuevapagina: true,

        }
        case VALIDAR_EVENTO:
        return {
            ...state,
           errorformulario: true

        }
        case EVENTO_ACTUAL:
                  return {
            ...state,
            evento: state.eventos.filter(evento => evento._id === action.payload),
            eventoseleccionado: action.payload,
           

        }

        case EVENTO_ACTUAL2:
           return {
            ...state,
            eventoparticipante2: state.eventosParticipantes.filter(evento => evento._id === action.payload),
            eventoseleccionado: action.payload,
     

  }

        case ELIMINAR_EVENTO:
        return {
            ...state,
            eventos: state.eventos.filter(evento => evento._id !== action.payload),
            evento:null
            

        }

        case EVENTO_ERROR:
            return{
                ...state,
                mensaje: action.payload
            }

            case ACTUALIZAR_EVENTO:
                return{
                    ...state,
                    eventos: state.eventos.map(evento => evento._id === action.payload._id ? action.payload : evento),
                    eventoseleccionado: null,
                    nuevapagina: false
                }   
            
                case NOMINADO_NUEVO:
                    return {
                        ...state,
                        nuevapagina: true
                    }

                    case CAMBIAR_ESTADO:
                    return {
                        ...state,
                        
                        eventoseleccionado: null,
                        nuevapagina: false,
                        
                    }

                    case RESET_VALORES:
                        return {
                            ...state,
                            eventoseleccionado: null,
                           nuevapagina: false
                         
                        }

                    

    default: 
        return state;
}
}