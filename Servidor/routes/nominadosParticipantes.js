const express = require('express');
const router = express.Router();
const nominadoParticipanteController = require('../controllers/nominadoParticipanteController');
const auth = require('../middleware/auth');
const {check} = require('express-validator');


//Obtener las tareas por proyecto
router.get('/',
//auth,
nominadoParticipanteController.obtenerNominadosParticipantes
);


module.exports = router;