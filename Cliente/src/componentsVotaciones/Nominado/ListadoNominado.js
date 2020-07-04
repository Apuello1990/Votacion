/*eslint-disable*/
import React, {useContext, Fragment} from 'react';
import Nominado from './Nominado'
import eventoContext from '../../context/eventos/eventoContext';
import nominadoContext from '../../context/nominado/nominadoContext';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import SnackbarContent from "../../components/Snackbar/SnackbarContent";


const ListadoNominado = () => {

     //  //Extraer presupuesto del state inicial
     const eventosContext = useContext(eventoContext)
     const {evento} = eventosContext;
    
     //Obtener la funcion del context de gastos
     const nominadosContext = useContext(nominadoContext);
     const {nominadosEvento} = nominadosContext;
 
     //Array destructuring para extraer el presupuesto actual
     const [eventoActual] = evento
   
    // console.log(nominadosEvento)
     return ( 
        <Fragment>
        {nominadosEvento.length === 0 ? ( 
         <SnackbarContent
      
         message="No existen nominados para este evento"
         color= "info"
         
         
       />)
       :
       <TransitionGroup>
           {nominadosEvento.map(nominado  =>(
               
               <CSSTransition
                     key= {nominado.id}
                     timeout={200}
               >
                   <Nominado
                       nominado = {nominado}
                       
                   />

               </CSSTransition>
           ))}
       </TransitionGroup>
       
       }
       
       </Fragment>
    )

   
}
 
export default ListadoNominado;