// import { PrismaClient } from '@prisma/client';
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

//create user or  auth registration controller
const createUser = async (req, res) => {
  try {
    const { password, email } = req.body;
    const saltRounds = 12;

    const existingUser = await prisma.user.findFirst({
      where: { email: email },
      select: {
        password: true,
      },
    });
    if (existingUser) res.status(401).json({ message: 'User already exist!' });

    //hash password
    const hash = bcrypt.hashSync(password, saltRounds);
    await prisma.user.create({
      data: {
        ...req.body,
        password: hash,
      },
    });
    res.status(201).json({ message: 'user created Successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'Something went wrong,could not create user!',
      status: 500,
    });
  }
};

//get users controller
const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        reservations: true,
      },
    });

    res.status(200).json({ data: users });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'Something went wrong,could not get users!',
      status: 500,
    });
  }
};

//get user by id
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const existingUser = await prisma.user.findUnique({
      where: { id: id },
      include: {
        reservations: true,
      },
    });
    if (!existingUser) res.status(404).json({ message: 'User not found!' });
    res.status(200).json({ message: 'get success!', data: existingUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'Something went wrong,could not get users!',
      status: 500,
    });
  }
};

// update user
const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updateUser = await prisma.user.update({
      where: { id: id },
      data: updates,
    });
    if (!updateUser) res.status(404).json({ message: 'Update failed...' });

    res.status(200).json({ message: 'update success!', data: updateUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'Something went wrong,could not get users!',
      status: 500,
    });
  }
};

// delete user

const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await prisma.user.delete({
      where: { id: id },
    });

    res.status(200).json({ message: 'delete success!', data: deleteUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'Something went wrong,could not get users!',
      status: 500,
    });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
};
