const { Router } = require('express');
const router = Router();
const Marca = require('../models/Marca');

router.post('/', async function (req, res) {
    try {

        let marca = new Marca();
        marca.nombre = req.body.nombre;
        marca.estado = req.body.estado;
        marca.fechaCreacion = new Date();
        marca.fechaActualizacion = new Date();

        marca = await marca.save();
        res.send(marca);

    } catch (error) {
        console.log(error);
        res.status(400).send('Error creando marca');
    }
});

router.get('/', async function (req, res) {
    try {
        const marca = await Marca.find();
        res.send(marca);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error obteniendo la lista de marca');
    }
});

router.put('/:marcaId', async function (req, res) {
    try {

        let marca = await Marca.findById(req.params.marcaId);

        if (!marca) {
            console.log(marca);
            return res.status(400).send('Marca no existe');
        }
        const existeMarca = await Marca.findOne({ nombre: req.body.nombre, _id: { $ne: marca._id } });

        if (existeMarca) {
            console.log(existeMarca);
            return res.status(400).send('Ya existe marca');
        }
        //marca.nombre = req.body.nombre;
        marca.estado = req.body.estado;
        marca.fechaActualizacion = new Date();

        marca = await marca.save();

        res.send(marca);

    } catch (error) {
        console.log(error);
        res.status(400).send('Error actualizando marca');
    }
});

module.exports = router;