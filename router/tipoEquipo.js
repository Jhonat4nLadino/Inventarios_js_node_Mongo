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

module.exports = router;