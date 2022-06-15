const { Router } = require('express');
const router = Router();
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

router.get('/:estadoEquipoId', async function (req, res) {
    try {
        const estado = await EstadoEquipo.findById(req.params.estadoEquipoId);
        if (!estado) {
            return res.status(404).send('Estado no existe');
        }
        res.send(estado);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error obteniendo la lista de estado');
    }
});

router.put('/:estadoEquipoId', async function (req, res) {
    try {

        let estadoEquipo = await EstadoEquipo.findById(req.params.estadoEquipoId);

        if (!estadoEquipo) {
            console.log(estadoEquipo);
            return res.status(400).send('Estado equipo no existe');
        }

        const existeEstadoEquipo = await EstadoEquipo.findOne({ nombre: req.body.nombre, _id: { $ne: estadoEquipo._id } });
        
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
        res.status(400).send('Error actualizando estado equipo')
    }
});

router.delete('/:estadoEquipoId', async function (req, res) {
    try {

        let estadoEquipo = await EstadoEquipo.findById(req.params.estadoEquipoId);
        if (!estadoEquipo) {
            return res.status(400).send('Estado equipo no existe');
        }
        estadoEquipo = await estadoEquipo.delete();
        res.send('Estado eliminado correctamente: ' + estadoEquipo)

    } catch (error) {
        console.log(error);
        res.status(500).send('Error eliminando estado equipo')
    }

});

module.exports = router;