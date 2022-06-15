const { body } = require('express-validator');
const { validateResult } = require('../helpers/validateHelper');

const validateCreate = [
    body('req.body.nombre', ' Por favor ingrese un nombre, el campo nombre esta vacio'),
    body('res.body.email', 'Por favor ingrese un email'),
    body('req.body.estado', 'Por favor ingrese un estado'),
    (req, res, next) => {
        validateResult(req, res, next);
    }
]

module.exports = { validateCreate }

