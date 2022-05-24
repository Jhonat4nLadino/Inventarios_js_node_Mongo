const { Schema, model, SchemaTypes } = require('mongoose');

const InvetarioSchema = ({
    nombre: {
        type: String,
        required: true,
    },
    serial: {
        type: String,
        required: true,
        unique: true,
    },
    modelo: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    foto: {
        type: String,
        required: true,
    },
    fechaCompra: {
        type: Date,
        required: true,
    },
    precio: {
        type: Number,
        required: true,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: false,
    },
    marca: {
        type: SchemaTypes.ObjectId,
        ref: 'Marca',
        required: true,
    },
    tipoEquipo: {
        type: Schema.Types.ObjectId,
        ref: 'TipoEquipo',
        required: true,
    },
    estadoEquipo: {
        type: Schema.Types.ObjectId,
        ref: 'EstadoEquipo',
        required: true,
    },
    fechaCreacion: {
        type: Date,
        required: true,
    },
    fechaActualizacion: {
        type: Date,
        required: true,
    }
});

module.exports = model('Inventario', InvetarioSchema);