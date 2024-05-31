const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// create reservation
const createReservation = async (req, res) => {
  try {
    const { userId, city, reservationDate, vehicles } = req.body;
    const reserve = {
      userId: userId,
      city: city,
      reservationDate: reservationDate,
    };
    const newReservation = await prisma.reservation.create({
      data: {
        ...reserve,
        vehicles: {
          //connect reservation and vehicles
          connect: { id: vehicles.id },
        },
      },
      include: {
        vehicles: true,
      },
    });

    // update vehicle status upon reservation
    let updateVehicleStatus;
    if (newReservation) {
      updateVehicleStatus = await prisma.vehicle.update({
        where: { id: vehicles.id },
        data: {
          status: 'reserved',
        },
      });
    }
    res.status(201).json({
      message: 'reservation created!',
      data: newReservation,
      vehicleUpdate: updateVehicleStatus,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

// get all reservations
const getReservation = async (req, res) => {
  try {
    let reservations = await prisma.reservation.findMany({
      include: {
        vehicles: true,
      },
    });
    res.status(200).json({ message: 'success!', data: reservations });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

//get reservation by id

const getReservationById = async (req, res) => {
  try {
    const { id } = req.params;
    const reserve = await prisma.reservation.findUnique({
      where: { id: id },
      include: {
        vehicles: true,
      },
    });
    res.status(200).json({ message: 'success!', data: reserve });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
//update reservations

const updateReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const { vehicles, ...updates } = req.body;
    const exReservation = await prisma.reservation.findUnique({
      where: { id: id },
      select: {
        id: true,
      },
    });

    console.log('EXRESERV:', exReservation);
    if (!exReservation)
      res.status(402).json({ message: 'Reservation not Found!' });

    // update the reservation table
    console.log('UPDATES:', vehicles);
    const updated = await prisma.reservation.update({
      where: { id: id },
      data: {
        userId: updates.userId,
        city: updates.city,
        reservationDate: updates.reservationDate,
      },
    });

    // check vehicle status updates if any
    if (updated && vehicles.status && vehicles.id) {
      await prisma.vehicle.update({
        where: { id: vehicles.id },
        data: {
          status: vehicles.status,
        },
      });
    }
    res.status(200).json({ message: 'Reservation updated!', data: updated });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

// delete reservation
const deleteReservationById = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.reservation.delete({
      where: { id: id },
    });
    res.status(200).json({ message: 'delete reservation success!' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

module.exports = {
  createReservation,
  getReservation,
  updateReservation,
  getReservationById,
  deleteReservationById,
};
