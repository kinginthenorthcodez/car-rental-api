const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// create vehicle
const createVehicle = async (req, res) => {
  try {
    const { reservationId, ...vehicle } = req.body;
    await prisma.vehicle.create({
      data: {
        ...vehicle,
      },
    });

    res.status(201).json({ message: 'vehicle created!' });
  } catch (error) {
    console.log(error);
    res.json({ error: error });
  }
};

// get all vehicles
const getVehicles = async (req, res) => {
  try {
    let vehicles = await prisma.vehicle.findMany({
      include: {
        reservation: true,
      },
    });
    res.status(200).json({ message: 'success!', data: vehicles });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong!' });
  }
};

// get vehicle by id

const getVehicleById = async (req, res) => {
  try {
    const { id } = req.params;
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: id },
      include: {
        reservation: true,
      },
    });

    res.status(200).json({ message: 'success!', data: vehicle });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong!' });
  }
};

// update vehicle

const updateVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updated = await prisma.vehicle.update({
      where: { id: id },
      data: updates,
    });

    res.status(200).json({ message: 'update success!', data: updated });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong!' });
  }
};

// delete vehicle

const deleteVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.vehicle.delete({
      where: { id: id },
    });
    res.status(200).json({ message: 'vehicle deleted!' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong!' });
  }
};
module.exports = {
  createVehicle,
  getVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
};
