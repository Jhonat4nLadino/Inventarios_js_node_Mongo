const { Router } = require('express');
const router = Router();
const Inventario = require('../models/Inventario');

router.post('/', async function (req, res) {
    try {
        constExisteInventarioPorSerial = await Inventario.findOne({ serial: req.body.serial });

        if (constExisteInventarioPorSerial) {
            return res.status(400).send('Ya existe el serial');
        }

        let inventario = new Inventario();
        inventario.nombre = req.body.nombre;
        inventario.serial = req.body.serial;
        inventario.modelo = req.body.modelo;
        inventario.descripcion = req.body.descripcion;
        inventario.color = req.body.color;
        inventario.foto = req.body.foto;
        inventario.fechaCompra = req.body.fechaCompra;
        inventario.precio = req.body.precio;
        inventario.usuario = req.body.usuario._id;
        inventario.marca = req.body.marca._id;
        inventario.tipoEquipo = req.body.tipoEquipo._id;
        inventario.estadoEquipo = req.body.estadoEquipo._id;
        inventario.fechaCreacion = new Date();
        inventario.fechaActualizacion = new Date();

        inventario = await inventario.save();

        res.send(inventario);

    } catch (error) {
        console.log(error);
        res.status(500).send('Error creando inventario');
    }
});

router.get('/', async function (req, res) {
    try {
        const inventario = await Inventario.find().populate([
            {
                path: 'usuario', select: 'nombre email estado'
            },
            {
                path: 'marca', select: 'nombre estado'
            },
            {
                path: 'tipoEquipo', select: 'nombre estado'
            },
            {
                path: 'estadoEquipo', select: 'nombre estado'
            },

        ]);
        res.send(inventario);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error obteniendo la lista de inventarios');
    }
});

router.get('/:inventarioId', async function (req, res) {
    try {
        const inventario = await Inventario.findById(req.params.inventarioId);
        if (!inventario) {
            return res.status(404).send('Inventario no existe');
        }
        res.send(inventario);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error obteniendo la lista de inventarios');
    }
});

router.put('/:inventarioId', async function (req, res) {
    try {
        let inventario = await Inventario.findById(req.params.inventarioId);

        if (!inventario) {
            return res.status(400).send('Inventario no existe');
        }

        const existeInventarioPorSerial = await
            Inventario.findOne({ serial: req.body.serial, _id: { $ne: inventario._id } });

        if (existeInventarioPorSerial) {
            return res.status(400).send('Ya existe el serial para otro equipo');
        }
        inventario.nombre = req.body.nombre;
        inventario.serial = req.body.serial;
        inventario.modelo = req.body.modelo;
        inventario.descripcion = req.body.descripcion;
        inventario.color = req.body.color;
        inventario.foto = req.body.foto;
        inventario.fechaCompra = req.body.fechaCompra;
        inventario.precio = req.body.precio;
        inventario.usuario = req.body.usuario._id;
        inventario.marca = req.body.marca._id;
        inventario.tipoEquipo = req.body.tipoEquipo._id;
        inventario.estadoEquipo = req.body.estadoEquipo._id;
        inventario.fechaActualizacion = new Date();

        inventario = await inventario.save();

        res.send(inventario);

    } catch (error) {
        console.log(error);
        res.status(500).send('Error actualizando el inventario');
    }
});

router.delete('/:inventarioId', async function (req, res) {
    try {

        let inventarioId = await inventarioId.findById(req.params.inventarioId);
        if (!inventarioId) {
            return res.status(400).send('Inventario no existe');
        }
        inventarioId = await inventarioId.delete();
        res.send('Inventario eliminado correctamente: ' + inventarioId)

    } catch (error) {
        console.log(error);
        res.status(500).send('Error eliminando inventario equipo')
    }

});

module.exports = router;