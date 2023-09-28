const { Camion, Conductor } = require('../models/camion');


const conductorController = {};

// Crear Conductor
conductorController.createConductor = async (req, res) => {
    try {
        const { nombre, viatico } = req.body;
        
        const newConductor = new Conductor({ nombre, viatico });
        await newConductor.save();
        
        res.status(201).json({ message: 'Conductor creado exitosamente', conductor: newConductor });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear conductor', error });
    }
};

// Obtener todos los Conductores
conductorController.listConductores = async (req, res) => {
    try {
        const conductores = await Conductor.find();
        res.status(200).json({ conductores });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener conductores', error });
    }
};

// Obtener un Conductor por ID
conductorController.getConductor = async (req, res) => {
    try {
        const { id } = req.params;
        const conductor = await Conductor.findById(id);
        if (!conductor) return res.status(404).json({ message: 'Conductor no encontrado' });
        
        res.status(200).json({ conductor });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener conductor', error });
    }
};

// Actualizar un Conductor por ID
conductorController.updateConductor = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedConductor = await Conductor.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedConductor) return res.status(404).json({ message: 'Conductor no encontrado' });
        
        res.status(200).json({ message: 'Conductor actualizado exitosamente', conductor: updatedConductor });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar conductor', error });
    }
};

// Eliminar un Conductor por ID
conductorController.deleteConductor = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedConductor = await Conductor.findByIdAndDelete(id);
        if (!deletedConductor) return res.status(404).json({ message: 'Conductor no encontrado' });
        
        res.status(200).json({ message: 'Conductor eliminado exitosamente', conductor: deletedConductor });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar conductor', error });
    }
};

module.exports = conductorController;
