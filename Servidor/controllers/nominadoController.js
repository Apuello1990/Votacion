const Nominado = require('../models/Nominado');
const Evento = require('../models/Evento');
const {validationResult} = require('express-validator');


//Crea una nueva tarea
exports.crearNominado = async(req, res) =>{
    

     //Reviar si hay errores
     const errores = validationResult(req);
     if(!errores.isEmpty()){
         return res.status(400).json({errores: errores.array()})
     }

     

     try {

        //Extraer el proyecto y comprobar si existe

        const {evento} = req.body;

         const existeEvento = await Evento.findById(evento);
         if(!existeEvento){
             return res.status(404).json({msg:'Evento no encontrado'})
         }

        //  //Revisar si el proyecto actual pertenece al usuario autenticado
        //  if(existeEvento.creador.toString() !== req.usuario.id){
        //     return res.status(401).json({msg: 'No Autorizado'});
        // }


        //Creamos la tarea
        const nominado = new Nominado(req.body);
        await nominado.save();
        res.json({nominado});


     } catch (error) {
         console.log(error);
         res.status(500).send('Hubo un error')
     }

}

//Obtiene las tareas por proyecto
exports.obtenerNominados = async(req, res) =>{

    try {

         //Extraer el proyecto y comprobar si existe

         const {evento} = req.query;

         const existeEvento = await Evento.findById(evento);
         if(!existeEvento){
             return res.status(404).json({msg:'Evento no encontrado'})
         }

         //Revisar si el proyecto actual pertenece al usuario autenticado
         if(existeEvento.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No Autorizado'});
        }

        //Obtener las tareas por proyecto
       const nominados = await Nominado.find({evento}).sort({creado: -1});
       res.json({nominados})
       
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
        
    }
}

//Actualizar una tarea
exports.actualizarNominado = async(req, res) =>{
    try {
        
        //Extraer el proyecto y comprobar si existe

        const {evento, nombre} = req.body;

        //Si la tarea existe o no
        let nominadoExiste = await Nominado.findById(req.params.id);
      
        if(!nominadoExiste){
            return res.status(404).json({msg:"No existe nominado"});
        }

        //Extraer proyecto
        const existeEvento = await Evento.findById(evento);
    

        //Revisar si el proyecto actual pertenece al usuario autenticado
        if(existeEvento.creador.toString() !== req.usuario.id){
           return res.status(401).json({msg: 'No Autorizado'});
       }
       
       //Crear un objeto con la nueva informacion
       const nuevoNominado= {};
       nuevoNominado.nombre = nombre;
        
        

        //Guardar la tarea
        nominado = await Nominado.findOneAndUpdate({_id: req.params.id}, nuevoNominado, {new: true});
        res.json({nominado})

    } catch (error) {
        console.log(error).send('Hubo un error');
        
    }

}

exports.eliminarNominado = async(req, res)=>
{
  try {
      
    //Extraer el proyecto y comprobar si existe

    const {evento} = req.query;

    //Si la tarea existe o no
    let nominadoExiste = await Nominado.findById(req.params.id);
  
    if(!nominadoExiste){
        return res.status(404).json({msg:"No existe este nominado"});
    }

    //Extraer proyecto
    const existeEvento = await Evento.findById(evento);


    //Revisar si el proyecto actual pertenece al usuario autenticado
    if(existeEvento.creador.toString() !== req.usuario.id){
       return res.status(401).json({msg: 'No Autorizado'});
   }

   //Eliminar
   await Nominado.findOneAndRemove({_id: req.params.id});
   res.json({msg: 'Nominado Eliminado'})

  } catch (error) {
     console.log(error);
     res.status(500).send('Hubo un error');
  }
}

