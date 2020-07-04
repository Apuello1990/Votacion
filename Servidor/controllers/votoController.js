//const Voto = require('../models/Voto')
const Nominado = require('../models/Nominado')
const {validationResult} = require('express-validator')

// exports.crearVoto = async(req, res) =>{

//     //Reviar si hay errores
//     const errores = validationResult(req);
//      if(!errores.isEmpty()){
//          return res.status(400).json({errores: errores.array()})
//      }

//     try {
      
//        //Crear nuevo proyecto
//        const votacion = new Voto(req.body);

//        //Guardar el creador via JWT
//       // votacion.creador = req.usuario.id;

//        //Guardamos el proyecto
//         await votacion.save();
//        res.json({votacion});

       

//     } catch(error){
//         console.log(error);
//         res.status(500).send('Hubo un error');
//     }

// }

//Actualizar una tarea
exports.actualizarNominadoVotacion = async(req, res) =>{
    //Reviar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }
   
    //extraer la informacion del proyecto
    const {voto} = req.body;
    const nuevoProyecto = {};

    //Para cada campo que desees actualizar debes hacer un if
    if(voto){
        nuevoProyecto.voto = voto;
    }

    try {

       //Revisar el id
       let proyecto = await Nominado.findById(req.params.id);

       //Si el proyecto existe o no
       if(!proyecto){
           return res.status(404).json({msg:'Proyecto no encontrado'})
       }

    //    //Verificar el creador del proyecto
    //    if(proyecto.creador.toString() !== req.usuario.id){
    //        return res.status(401).json({msg: 'No Autorizado'});
    //    }

       //Actualizar 
       proyecto = await Nominado.findByIdAndUpdate({_id: req.params.id}, {$set: nuevoProyecto}, {new: true});
       res.json({proyecto});

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
        
    }

}