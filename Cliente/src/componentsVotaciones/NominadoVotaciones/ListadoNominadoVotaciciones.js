import React, {useContext, Fragment} from 'react';
import NominadoVotaciones from './NominadoVotaciones'
//import eventoContext from '../../context/eventos/eventoContext';
import nominadoContext from '../../context/nominado/nominadoContext';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import SnackbarContent from "../../components/Snackbar/SnackbarContent";


const ListadoNominadoVotaciones = () => {

     //  //Extraer presupuesto del state inicial
    //  const eventosContext = useContext(eventoContext)
    //  const {evento} = eventosContext;
    
     //Obtener la funcion del context de gastos
     const nominadosContext = useContext(nominadoContext);
     const {nominadoEventoParticipante} = nominadosContext;
 
     //Array destructuring para extraer el presupuesto actual
    // const [eventoActualParticipante] = evento
   //  console.log(nominadoEventoParticipante)
   
     return ( 

        <Fragment>
        {nominadoEventoParticipante.length === 0 ? ( 
         <SnackbarContent
      
         message="No existen nominados para este evento"
         color= "info"
         
         
       />)
       :
      <>
       
       <TransitionGroup>
           {nominadoEventoParticipante.map(nominadoprueba =>(
               
               <CSSTransition
                     key= {nominadoprueba.id}
                     timeout={200}
               >
                   <NominadoVotaciones
                       nominadoprueba = {nominadoprueba}
                       
                   />

               </CSSTransition>
           ))}
       </TransitionGroup>
       </>
       }
       
       </Fragment>
    )

   
}
 
export default ListadoNominadoVotaciones;