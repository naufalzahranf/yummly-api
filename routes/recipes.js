/* eslint-disable linebreak-style */
const express = require('express');
const recipeController = require('../controllers').Recipe;

const router = express.Router();

/* GET users listing. */
// eslint-disable-next-line no-unused-vars
router.get('/', recipeController.findAll);
router.post('/', recipeController.create);
router.delete('/:id', recipeController.delete);
router.put('/:id', recipeController.update);

module.exports = router;
