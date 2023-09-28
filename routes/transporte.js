const express = require('express');
const router = express.Router();

const camionController = require('../controller/camionController');
const guiaController = require('../controller/guiaController');
const conductorController = require('../controller/conductorController'); 
const mantenimientoController = require('../controller/mantenimientoController'); 
// Rutas para Camiones
router.post('/camiones', camionController.crearCamion);
router.get('/camiones', camionController.obtenerCamiones);
router.get('/camiones/:placa', camionController.obtenerCamion);
router.put('/camiones/:placa', camionController.actualizarCamion);
router.delete('/camiones/:placa', camionController.eliminarCamion);

router.get('/camiones/:placa/reportes', camionController.generarReportePorPlaca);

// Rutas para Guías
router.post('/camiones/:placa/guias', guiaController.crearGuia);
router.get('/camiones/:placa/guias', guiaController.obtenerGuias);
router.get('/camiones/:placa/guias/:numero', guiaController.obtenerGuia);
router.put('/camiones/:placa/guias/:numero', guiaController.actualizarGuia);
router.delete('/camiones/:placa/guias/:numero', guiaController.eliminarGuia);

// Rutas para Conductores
router.post('/conductores', conductorController.createConductor); 
router.get('/conductores', conductorController.listConductores); 
router.get('/conductores/:id', conductorController.getConductor); 
router.put('/conductores/:id', conductorController.updateConductor); 
router.delete('/conductores/:id', conductorController.deleteConductor); 

//mantenimientos
router.post('/camiones/:placa/mantenimientos', mantenimientoController.crearMantenimiento); 
router.get('/camiones/:placa/mantenimientos', mantenimientoController.obtenerMantenimientos);
router.put('/camiones/:placa/mantenimientos/:mantenimientoId', mantenimientoController.actualizarMantenimiento); 
router.delete('/camiones/:placa/mantenimientos/:mantenimientoId', mantenimientoController.eliminarMantenimiento);
module.exports = router;