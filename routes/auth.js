//Rutas para autenticar usuario
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController')
// crea un usuario
// api/auth
router.post('/',
    [
        check('email','Agregar un email valido').isEmail(),
        check('password','Agregar un email valido').isLength({min: 6}),
    ],
    authController.autenticarUsuario
)

module.exports = router;