const { Router } = require('express');
const router = Router();
const { check, validationResult } = require('express-validator');
const EstadoEquipo = require('../models/EstadoEquipo');

router.post('/', async function (req, res) {
    try {
        let estadoEquipo = new EstadoEquipo();
        estadoEquipo.nombre = req.body.nombre;
        estadoEquipo.estado = req.body.estado;
        estadoEquipo.fechaCreacion = new Date();
        estadoEquipo.fechaActualizacion = new Date();

        estadoEquipo = await estadoEquipo.save();

        res.send(estadoEquipo);

    } catch (error) {
        console.log(error);
        res.status(400).send('Error creando estado de equipo')
    }
});

router.get('/', async function (req, res) {
    try {
        const estadoEquipo = await EstadoEquipo.find();
        res.send(estadoEquipo);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error obteniendo la lista de estado de equipo');
    }
});

router.put('/:estadoEquipoId', async function (req, res) {
    try {
        let estadoEquipo = await EstadoEquipo.findById(req.params.estadoEquipoId);

        if (!estadoEquipo) {
            return res.status(400).send('Estado equipo no existe');
        }
        const existeEstadoEquipo = await EstadoEquipo.findOne({ estado: req.body.estado, _id: { $ne: estadoEquipo._id } });
        if (existeEstadoEquipo) {
            return res.status(400).send('Ya existe el estado equipo');
        }
        estadoEquipo.nombre = req.body.nombre;
        estadoEquipo.estado = req.body.estado;
        estadoEquipo.fechaActualizacion = new Date();

        estadoEquipo = await estadoEquipo.save();

        res.send(estadoEquipo);

    } catch (error) {
        console.log(error);
        res.status(500).send('Error actulizando estado equipo')
    }
});

module.exports = router;