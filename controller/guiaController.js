const { Camion, Conductor } = require('../models/camion');

// Crear Guía
exports.crearGuia = async (req, res) => {
    try {
        const placa = req.params.placa;
        const camion = await Camion.findOne({ placa });
        if (!camion) return res.status(404).send({ message: 'Camión no encontrado' });

        camion.guias.push(req.body);
        await camion.save();
        res.status(201).send({ guia: req.body });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error al crear la guía.' });
    }
};

// Obtener Guías de un Camión
exports.obtenerGuias = async (req, res) => {
    try {
        const placa = req.params.placa;
        const camion = await Camion.findOne({ placa }, 'guias');
        if (!camion) return res.status(404).send({ message: 'Camión no encontrado' });
        res.status(200).send({ guias: camion.guias });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error al obtener las guías.' });
    }
};

// Obtener Guía Específica de un Camión
exports.obtenerGuia = async (req, res) => {
    try {
        const placa = req.params.placa;
        const numeroGuia = req.params.numero;
        const camion = await Camion.findOne({ placa, "guias.numero": numeroGuia }, { 'guias.$': 1 });
        if (!camion) return res.status(404).send({ message: 'Guía no encontrada' });
        res.status(200).send({ guia: camion.guias[0] });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error al obtener la guía.' });
    }
};

// Actualizar Guía de un Camión
exports.actualizarGuia = async (req, res) => {
    try {
        const placa = req.params.placa;
        const numeroGuia = req.params.numero;
        const camion = await Camion.findOneAndUpdate(
            { placa, "guias.numero": numeroGuia },
            { "$set": { "guias.$": req.body } },
            { new: true, projection: { 'guias.$': 1 } }
        );
        if (!camion) return res.status(404).send({ message: 'Guía no encontrada' });
        res.status(200).send({ guia: camion.guias[0] });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error al actualizar la guía.' });
    }
};

// Eliminar Guía de un Camión
exports.eliminarGuia = async (req, res) => {
    try {
        const placa = req.params.placa;
        const numeroGuia = req.params.numero;
        const camion = await Camion.findOneAndUpdate(
            { placa },
            { "$pull": { "guias": { "numero": numeroGuia } } },
            { new: true }
        );
        if (!camion) return res.status(404).send({ message: 'Guía no encontrada' });
        res.status(200).send({ message: 'Guía eliminada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error al eliminar la guía.' });
    }
};
