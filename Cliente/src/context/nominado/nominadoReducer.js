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



export default (state, action) =>{
    switch(action.type){

        case NOMINADOS_EVENTO:
         //   console.log(action.payload)
            return{
                ...state,
                nominadosEvento: action.payload
                
            }

            case NOMINADOS_EVENTO2:
             //   console.log(action.payload)
                return{
                    ...state,
                    nominadoEventoParticipante: action.payload
                    
                }


                case VERIFICAR:
                 //   console.log(action.payload)
                    return{
                        ...state,
                        nominadoEventoVoto: action.payload
                        
                    }
    

           
            case AGREGAR_NOMINADO:
            return{
                ...state,
                nominadosEvento: [action.payload, ...state.nominadosEvento],
                errornominado: false,
                agregarNominado: action.payload
            }
           
           
            case VALIDAR_NOMINADO:
            return{
                ...state,
                errornominado: true
            }


            case ELIMINAR_NOMINADO:
            return{
                ...state,
                nominadosEvento: state.nominadosEvento.filter(nominado => nominado._id !== action.payload),
                }

          
                       
           
            case NOMINADO_ACTUAL:
            return{
                ...state,
                nominadoseleccionado: action.payload
              }
              
             
              case ACTUALIZAR_NOMINADO:
                return{
                    ...state,
                    nominadosEvento: state.nominadosEvento.map(nominado => nominado._id === action.payload._id ? action.payload : nominado),
                    nominadoseleccionado: null
                   
                }

                case ACTUALIZAR_NOMINADO2:
                   
                    return{
                        ...state,
                        nominadosEvento2: state.nominadosEvento2.map(nominado => nominado._id === action.payload._id ? action.payload : nominado),
                        nominadoseleccionado: null
                       
                    }

               
                case CAMBIAR_ESTADO2:
                    return {
                        ...state,
                        nominadoseleccionado: null,
                        
                        
                    }

        case OBTENER_USUARIOS:
                     //       console.log(action.payload)
                        return {
                            ...state,
                         usuario: action.payload
        }

        default:
            return state;
    }

}