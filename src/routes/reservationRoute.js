const express = require('express');
const reservationRouter = express.Router();
const {
  createReservation,
  getReservation,
  getReservationById,
  updateReservation,
  deleteReservationById,
} = require('../controllers/reservationController');

reservationRouter.get('/', getReservation);
reservationRouter.post('/', createReservation);
reservationRouter.get('/:id', getReservationById);
reservationRouter.put('/:id', updateReservation);
reservationRouter.delete('/:id', deleteReservationById);

module.exports = reservationRouter;
