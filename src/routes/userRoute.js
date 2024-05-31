const express = require('express');
const userRouter = express.Router();
const {
  getAllUsers,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
} = require('../controllers/userController');

userRouter.get('/', getAllUsers);
userRouter.get('/:id', getUserById);
userRouter.post('/', createUser);
userRouter.put('/:id', updateUserById);
userRouter.delete('/:id', deleteUserById);

//default export
module.exports = userRouter;
