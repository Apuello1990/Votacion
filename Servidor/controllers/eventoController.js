const Evento = require('../models/Evento')
const {validationResult} = require('express-validator')

exports.crearEvento = async(req, res) =>{

    //Reviar si hay errores
    const errores = validationResult(req);
     if(!errores.isEmpty()){
         return res.status(400).json({errores: errores.array()})
     }

    try {

        //Crear nuevo evento
        const evento = new Evento(req.body);

        //Guardar el creador via JWT
        evento.creador = req.usuario.id;

        //Guardamos el evento
        evento.save();
        res.json(evento);

    } catch(error){
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}


//Obtiene todos los eventos del usuario actual
exports.obtenerEventos = async(req, res) =>{
    try {
        //Trae todo los eventos del creador y los ordena del mas reciente
        const eventos = await Evento.find({creador: req.usuario.id}).sort({creado: -1});
        res.json({eventos})
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error')
    }
}




//Actualiza un evento
exports.actualizarEvento = async (req, res) =>{
 
     //Reviar si hay errores
     const errores = validationResult(req);
     if(!errores.isEmpty()){
         return res.status(400).json({errores: errores.array()})
     }
    
     //extraer la informacion del evento
     const {nombre} = req.body;
     const nuevoEvento = {};

     //Para cada campo que desees actualizar debes hacer un if
     if(nombre){
        nuevoEvento.nombre = nombre;
     }

     try {

        //Revisar el id
        let evento = await Evento.findById(req.params.id);

        //Si el evento existe o no
        if(!evento){
            return res.status(404).json({msg:'Evento no encontrado'})
        }

        //Verificar el creador del evento
        if(evento.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No Autorizado'});
        }

        //Actualizar 
        evento = await Evento.findByIdAndUpdate({_id: req.params.id}, {$set: nuevoEvento}, {new: true});
        res.json({evento});

     } catch (error) {
         console.log(error);
         res.status(500).send('Error en el servidor');
         
     }

}

//Elimina un evento por su ID
exports.eliminarEvento = async(req, res) =>{

    try {

         //Revisar el id
         let evento = await Evento.findById(req.params.id);

         //Si el evento existe o no
         if(!evento){
             return res.status(404).json({msg:'Evento no encontrado'})
         }
 
         //Verificar el creador del evento
         if(evento.creador.toString() !== req.usuario.id){
             return res.status(401).json({msg: 'No Autorizado'});
         }

         //Eliminar el Evento
         await Evento.findOneAndRemove({_id: req.params.id});
         res.json({msg:'Evento eliminado'})
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor')
    }

}

