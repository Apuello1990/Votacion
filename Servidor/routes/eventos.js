const express = require('express');
const router = express.Router();
const eventoController = require('../controllers/eventoController');
const auth = require('../middleware/auth');
const {check} = require('express-validator')

//Crea eventos
//api/eventos
router.post('/',
    auth,
    [
        check('nombre', 'El nombre del evento es obligatorio').not().isEmpty()
    ],
    eventoController.crearEvento
);


//Obtener todos los eventos
router.get('/',
    auth,
    eventoController.obtenerEventos
);


//Actulizar evento via ID
router.put('/:id',
auth,
[
    check('nombre', 'El nombre del evento es obligatorio').not().isEmpty()
],
eventoController.actualizarEvento 

);


//Eliminar un Proyecto
router.delete('/:id',
auth,
eventoController.eliminarEvento

);

module.exports = router;