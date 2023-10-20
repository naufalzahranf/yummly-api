/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable linebreak-style */
/* eslint-disable arrow-spacing */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
const db = require('../models');

const User = db.users;

exports.findAll = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json({
      message: 'Users retrieved successfully.',
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || 'Some error occurred while retrieving users.',
      data: null,
    });
  }
};

exports.create = async (req, res) => {
  try {
    const user = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const data = await User.create(user);
    res.json({
      message: 'User created successfully',
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || 'Some error occurred while creating the User.',
      data: null,
    });
  }
};

// eslint-disable-next-line consistent-return
exports.delete = async (req, res)=> {
  try {
    const userId = req.params.id;
    // Menggunakan "where" untuk mengidentifikasi data yang akan dihapus berdasarkan ID
    const result = await User.destroy({
      where: {
        id: userId,
      },
    });

    if (result === 0) {
      return res.status(404).json({
        message: 'User not found',
        data: null,
      });
    }

    res.json({
      message: 'User deleted successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || 'Some error occurred while deleting the User.',
      data: null,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUserData = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
      updatedAt: new Date(),
    };

    const [rowsUpdated, [updatedUser]] = await User.update(updatedUserData, {
      where: { id: userId },
      returning: true,
    });

    if (rowsUpdated === 0) {
      return res.status(404).json({
        message: 'User not found',
        data: null,
      });
    }

    res.json({
      message: 'User updated successfully',
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || 'Some error occurred while updating the User.',
      data: null,
    });
  }
};
