const express = require('express');
const vehicleRouter = express.Router();
const {
  createVehicle,
  getVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
} = require('../controllers/vehicleController');

vehicleRouter.get('/', getVehicles);
vehicleRouter.post('/', createVehicle);
vehicleRouter.get('/:id', getVehicleById);
vehicleRouter.put('/:id', updateVehicle);
vehicleRouter.delete('/id', deleteVehicle);

module.exports = vehicleRouter;
