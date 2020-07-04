const Evento = require('../models/Evento')
const {validationResult} = require('express-validator')

//Obtiene todos los eventos del usuario actual
exports.obtenerEventosParticipante = async(req, res) =>{
    try {
        //Trae todo los eventos del creador y los ordena del mas reciente
        const eventos = await Evento.find()
        res.json({eventos})
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error')
    }
}