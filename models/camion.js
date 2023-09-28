
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GuiaSchema = new Schema({
    numero: { type: String },
    origen: { type: String },
    precio: { type: Number},
    destino: { type: String},
    tipo: { type: String},
    conductor: {
        id: { type: Schema.Types.ObjectId, ref: 'Conductor'},
        nombre: { type: String },
        viatico: { type: Number}
    },
    fechas: { type: Object} 
});

const MantenimientoSchema = new Schema({
    fecha: { type: Date, required: true },
    kilometraje: { type: Number, required: true },
    fechaFuturo: { type: Date, required: true },
    costo: { type: Number, required: true },
    descripcion: [{ type: String }],
    piezas: [{ type: String }],
   
});

const CamionSchema = new Schema({
    placa: { type: String, required: true, unique: true },
    categoria: { type: Number, required: true },
    guias: [GuiaSchema],
    mantenimientos: [MantenimientoSchema],
});

const ConductorSchema = new Schema({
    nombre: { type: String, required: true },
    viatico: { type: Number, required: true }
});
module.exports ={Camion: mongoose.model('Camion', CamionSchema), Conductor: mongoose.model('Conductor', ConductorSchema), Mantenimiento: mongoose.model('Mantenimiento', MantenimientoSchema)}
