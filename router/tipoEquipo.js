const { Router } = require('express');
const router = Router();
const TipoEquipo = require('../models/TipoEquipo');

router.post('/', async function (req, res) {
    try {

        let tipoEquipo = new TipoEquipo();

        tipoEquipo.nombre = req.body.nombre;
        tipoEquipo.estado = req.body.estado;
        tipoEquipo.fechaCreacion = new Date();
        tipoEquipo.fechaActualizacion = new Date();

        tipoEquipo = await tipoEquipo.save();
        res.send(tipoEquipo);

    } catch (error) {
        console.log(error);
        res.status(400).send('Error creando tipo de equipo');
    }
});

router.get('/', async function (req, res) {
    try {
        const tipoEquipo = await TipoEquipo.find();
        res.send(tipoEquipo);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error obteniendo la lista de tipo de equipo');
    }
});

router.get('/:tipoEquipoId', async function (req, res) {
    try {
        const tipo = await TipoEquipo.findById(req.params.tipoEquipoId);
        if (!tipo) {
            return res.status(404).send('Tipo no existe');
        }
        res.send(tipo);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error obteniendo la lista de tipo equipos');
    }
});

router.put('/:tipoEquipoId', async function (req, res) {
    try {
        let tipoEquipo = await TipoEquipo.findById(req.params.tipoEquipoId);

        if (!tipoEquipo) {
            console.log(tipoEquipo);
            return res.status(400).send('Tipo equipo no existe');
        }
        const existeTipoEquipo = await TipoEquipo.findOne({ nombre: req.body.nombre, _id: { $ne: tipoEquipo._id } });

        if (existeTipoEquipo) {
            console.log(existeTipoEquipo);
            return res.status(400).send('Ya existe tipo de equipo');
        }
        tipoEquipo.nombre = req.body.nombre;
        tipoEquipo.estado = req.body.estado;
        tipoEquipo.fechaActualizacion = new Date();

        tipoEquipo = await tipoEquipo.save();
        res.send(tipoEquipo);

    } catch (error) {
        console.log(error);
        res.status(400).send('Error actualizando tipo de equipo');
    }
});

router.delete('/:tipoEquipoId', async function (req, res) {
    try {

        let tipoEquipoId = await TipoEquipo.findById(req.params.tipoEquipoId);
        if (!tipoEquipoId) {
            return res.status(400).send('Tipo equipo no existe');
        }
        tipoEquipoId = await tipoEquipoId.delete();
        res.send('Tipo equipo eliminado correctamente: ' + tipoEquipoId)

    } catch (error) {
        console.log(error);
        res.status(500).send('Error eliminando tipo equipo')
    }

});

module.exports = router;