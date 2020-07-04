//Rutas para crear usuarios
const express = require('express');
const router = express.Router();
const votoController = require('../controllers/votoController');
const {check} = require('express-validator');


//Actulizar evento via ID
router.put('/:id',
//auth,
[
    check('voto', 'El nombre del evento es obligatorio').not().isEmpty()
],
votoController.actualizarNominadoVotacion

);

module.exports = router;