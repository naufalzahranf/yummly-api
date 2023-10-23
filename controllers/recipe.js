/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable linebreak-style */
/* eslint-disable arrow-spacing */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
const db = require('../models');

const Recipe = db.recipes;

exports.findAll = async (req, res) => {
  try {
    const recipes = await Recipe.findAll();
    res.json({
      code: 200,
      message: 'Recipes retrieved successfully.',
      data: recipes,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: error.message || 'Some error occurred while retrieving recipes.',
      data: null,
    });
  }
};

exports.create = async (req, res) => {
  try {
    const user = {
      title: req.body.title,
      thumbnail: req.body.thumbnail,
      banner: req.body.banner,
      description: req.body.description,
      video: req.body.video,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const data = await Recipe.create(user);
    res.json({
      code: 200,
      message: 'Recipe created successfully',
      data,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: error.message || 'Some error occurred while creating the Recipe.',
      data: null,
    });
  }
};

// eslint-disable-next-line consistent-return
exports.delete = async (req, res)=> {
  try {
    const recipeId = req.params.id;
    // Menggunakan "where" untuk mengidentifikasi data yang akan dihapus berdasarkan ID
    const result = await Recipe.destroy({
      where: {
        id: recipeId,
      },
    });

    if (result === 0) {
      return res.status(404).json({
        message: 'Recipe not found',
        data: null,
      });
    }

    res.json({
      code: 200,
      message: 'Recipe deleted successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: error.message || 'Some error occurred while deleting the Recipe.',
      data: null,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const updatedRecipeData = {
      title: req.body.title,
      thumbnail: req.body.thumbnail,
      banner: req.body.banner,
      description: req.body.description,
      video: req.body.video,
      updatedAt: new Date(),
    };

    const [rowsUpdated, [updatedRecipe]] = await Recipe.update(updatedRecipeData, {
      where: { id: recipeId },
      returning: true,
    });

    if (rowsUpdated === 0) {
      return res.status(404).json({
        message: 'Recipe not found',
        data: null,
      });
    }

    res.json({
      code: 200,
      message: 'Recipe updated successfully',
      data: updatedRecipe,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: error.message || 'Some error occurred while updating the Recipe.',
      data: null,
    });
  }
};
