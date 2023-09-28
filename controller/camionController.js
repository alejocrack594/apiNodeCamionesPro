var mongoose = require('mongoose');
const { Camion, Conductor } = require('../models/camion');

// Crear Camión
exports.crearCamion = async (req, res) => {
    try {
        let camion = new Camion(req.body);
        await camion.save();
        res.status(201).send({ camion });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error al crear el camión.' });
    }
};

// Obtener Camiones
exports.obtenerCamiones = async (req, res) => {
    try {
        const camiones = await Camion.find();
        res.status(200).send({ camiones });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error al obtener los camiones.' });
    }
};

// Obtener Camión por Placa
exports.obtenerCamion = async (req, res) => {
    try {
        const placa = req.params.placa;
        const camion = await Camion.findOne({ placa });
        if (!camion) return res.status(404).send({ message: 'Camión no encontrado' });
        res.status(200).send({ camion });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error al obtener el camión.' });
    }
};

// Actualizar Camión
exports.actualizarCamion = async (req, res) => {
    try {
        const placa = req.params.placa;
        const camion = await Camion.findOneAndUpdate({ placa }, req.body, { new: true });
        if (!camion) return res.status(404).send({ message: 'Camión no encontrado' });
        res.status(200).send({ camion });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error al actualizar el camión.' });
    }
};

// Eliminar Camión
exports.eliminarCamion = async (req, res) => {
    try {
        const placa = req.params.placa;
        const camion = await Camion.findOneAndDelete({ placa });
        if (!camion) return res.status(404).send({ message: 'Camión no encontrado' });
        res.status(200).send({ message: 'Camión eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error al eliminar el camión.' });
    }
};

// controller/camionController.js
exports.generarReportePorPlaca = async (req, res) => {
    try {
        const placa = req.params.placa;
        const camion = await Camion.findOne({ placa }).select('placa guias');
        
        if (!camion) return res.status(404).send({ message: 'Camión no encontrado' });
        
        const reporte = {
            placa: camion.placa,
            viajes: camion.guias.map(guia => ({
                origen: guia.origen,
                destino: guia.destino,
                numero: guia.numero,
                precio: guia.precio,
                fechas: guia.fechas,
                conductor: guia.conductor // Aquí puedes incluir más datos del conductor si lo necesitas
            }))
        };
        
        res.status(200).send(reporte);
        
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error al generar el reporte.' });
    }
};