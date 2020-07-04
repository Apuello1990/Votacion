const express = require('express');
const router = express.Router();
const verificarController = require('../controllers/verificarController');
const auth = require('../middleware/auth');
const {check} = require('express-validator');

//Obtener las tareas por proyecto
router.get('/',
//auth,
verificarController.obtenerEventosVoto
);

module.exports = router;