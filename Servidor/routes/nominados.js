const express = require('express');
const router = express.Router();
const nominadoController = require('../controllers/nominadoController');
const auth = require('../middleware/auth');
const {check} = require('express-validator');

//Crear una tarea
//api/tareas

router.post('/',
auth,
[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('evento', 'El evento es obligatorio').not().isEmpty()
],

nominadoController.crearNominado
);


//Obtener las tareas por proyecto
router.get('/',
auth,
nominadoController.obtenerNominados
);



//Actualizar tarea
router.put('/:id',
auth,
nominadoController.actualizarNominado
);

//Eliminar tarea
router.delete('/:id',
auth,
nominadoController.eliminarNominado
);





module.exports = router;