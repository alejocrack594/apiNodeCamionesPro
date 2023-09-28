const { Camion, Conductor, Mantenimiento } = require('../models/camion');

// Crear Mantenimiento
exports.crearMantenimiento = async (req, res) => {
    try {
        const placa = req.params.placa;
        const camion = await Camion.findOne({ placa });
        if (!camion) return res.status(404).send({ message: 'Camión no encontrado' });

        const nuevoMantenimiento = { ...req.body };
        camion.mantenimientos.push(nuevoMantenimiento);
        await camion.save();

        res.status(201).send({ mantenimiento: nuevoMantenimiento });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error al crear el mantenimiento.' });
    }
};

// Leer Mantenimientos
exports.obtenerMantenimientos = async (req, res) => {
    try {
        const placa = req.params.placa;
        const camion = await Camion.findOne({ placa });
        if (!camion) return res.status(404).send({ message: 'Camión no encontrado' });

        res.status(200).send({ mantenimientos: camion.mantenimientos });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error al obtener los mantenimientos.' });
    }
};

// Actualizar Mantenimiento
exports.actualizarMantenimiento = async (req, res) => {
    try {
        const placa = req.params.placa;
        const { mantenimientoId } = req.params;
        const camion = await Camion.findOne({ placa });
        if (!camion) return res.status(404).send({ message: 'Camión no encontrado' });

        const mantenimientoIndex = camion.mantenimientos.findIndex(m => m._id.toString() === mantenimientoId);
        if (mantenimientoIndex === -1) return res.status(404).send({ message: 'Mantenimiento no encontrado' });

        camion.mantenimientos[mantenimientoIndex] = { ...camion.mantenimientos[mantenimientoIndex].toObject(), ...req.body };
        await camion.save();

        res.status(200).send({ mantenimiento: camion.mantenimientos[mantenimientoIndex] });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error al actualizar el mantenimiento.' });
    }
};

// Eliminar Mantenimiento
exports.eliminarMantenimiento = async (req, res) => {
    try {
        const placa = req.params.placa;
        const { mantenimientoId } = req.params;
        const camion = await Camion.findOne({ placa });
        if (!camion) return res.status(404).send({ message: 'Camión no encontrado' });

        const mantenimientoIndex = camion.mantenimientos.findIndex(m => m._id.toString() === mantenimientoId);
        if (mantenimientoIndex === -1) return res.status(404).send({ message: 'Mantenimiento no encontrado' });

        camion.mantenimientos.splice(mantenimientoIndex, 1);
        await camion.save();

        res.status(200).send({ message: 'Mantenimiento eliminado exitosamente.' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error al eliminar el mantenimiento.' });
    }
};
