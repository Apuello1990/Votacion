const Nominado = require('../models/Nominado');
const Evento = require('../models/Evento');
const {validationResult} = require('express-validator');

//Obtiene las tareas por proyecto
exports.obtenerNominadosParticipantes = async(req, res) =>{

    try {

         //Extraer el proyecto y comprobar si existe

         const {evento} = req.query;

         const existeEvento = await Evento.findById(evento);
         if(!existeEvento){
             return res.status(404).json({msg:'Evento no encontrado'})
         }

      

        //Obtener las tareas por proyecto
       const nominados = await Nominado.find({evento}).sort({creado: -1});
       res.json({nominados})
       
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
        
    }
}