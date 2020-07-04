const express = require('express');
const router = express.Router();
const eventoParticipanteController = require('../controllers/eventoParticipanteController');
const auth = require('../middleware/auth');
const {check} = require('express-validator')

//Obtener todos los eventos
router.get('/',
    auth,
    eventoParticipanteController.obtenerEventosParticipante
    );

    module.exports = router;