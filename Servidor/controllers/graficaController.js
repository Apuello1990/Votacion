const Nominado = require('../models/Nominado');
const Evento = require('../models/Evento');
const {validationResult} = require('express-validator');

//Obtiene las tareas por proyecto
exports.obtenerGrafica= async(req, res) =>{

    try {
         const nominados = await Nominado.aggregate([
             
             {$group:{
                 _id:"$evento",
                 total:{$sum:'$voto'}
                }},
             {
                $lookup:{
                    from: 'eventos',
                    localField: '_id',
                    foreignField: "_id",
                    as: "nombre_evento"

                }
            }
         ])
        
       res.json({nominados})
       
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
        
    }
}