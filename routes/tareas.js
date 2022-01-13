const express = require('express')
const router = express.Router();
const tareaController = require('../controllers/tareaController')
const auth = require('../middleware/auth')
const {check} = require('express-validator') 
// crea un tarea
// api/tareas
router.post('/',
    auth,
    [
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('proyecto','El proyecto es obligatorio').not().isEmpty()
    ],
    tareaController.crearTarea
);

//obtener tareas por proyectos
router.get('/',
    auth,
    tareaController.obtenertareas
);

//actualizar proyectos via Id
router.put('/:id', 
    auth,
    tareaController.actualizartarea
);
//Eliminar un proyecto
router.delete('/:id',
    auth,
    tareaController.eliminartarea
);
module.exports = router;