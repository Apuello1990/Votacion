const express = require('express');
const router = express.Router();
const graficaController = require('../controllers/graficaController');
const auth = require('../middleware/auth');
const {check} = require('express-validator');

//Obtener las tareas por proyecto
router.get('/',
//auth,
graficaController.obtenerGrafica
);

module.exports = router;