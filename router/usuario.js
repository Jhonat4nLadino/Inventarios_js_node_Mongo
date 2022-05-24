const { Router } = require('express');
const router = Router();
const Usuario = require('../models/Usuario');

router.post('/', async function (req, res) {

    try {
        //console.log('Ingresó el objeto usuario', req.body);
        const existeUsuario = await Usuario.findOne({ email: req.body.email });

        if (existeUsuario) {
            return res.send('El e-mail ya existe')
        }
        let usuario = new Usuario();
        usuario.nombre = req.body.nombre;
        usuario.email = req.body.email;
        usuario.estado = req.body.estado;
        usuario.fechaCreacion = new Date();
        usuario.fechaActualizacion = new Date();

        usuario = await usuario.save();
        res.send(usuario);

    } catch (error) {
        console.log(error);
        res.status(400).send('Ocurrio un error al tratar de ingresar un usuario');
    }
});

router.get('/', async function (req, res) {
    try {
        const usuario = await Usuario.find();
        res.send(usuario);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error obteniendo la lista de usuarios');
    }
});

router.put('/:usuarioId', async function (req, res) {
    try {
        console.log('Objeto recibido', req.body, req.params);

        let usuario = await Usuario.findById(req.params.usuarioId);

        if (!usuario) {
            return res.status(400).send('Usuario no existe');
        }

        const existeUsuario = await Usuario.findOne({ email: req.body.email, _id: { $ne: usuario._id } });
        console.log('Ya existe usuario', existeUsuario);

        if (existeUsuario) {
            return res.status(400).send('Email ya existe');
        }
        usuario.nombre = req.body.nombre;
        usuario.email = req.body.email;
        usuario.estado = req.body.estado;
        usuario.fechaActualizacion = new Date();

        usuario = await usuario.save();

        res.send(usuario);

    } catch (error) {
        console.log(error);
        res.status(500).send('Error actualizando el usuario');
    }
});

module.exports = router;