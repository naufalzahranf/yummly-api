const express = require('express');
const userController = require('../controllers').User;

const router = express.Router();

/* GET users listing. */
// eslint-disable-next-line no-unused-vars
router.get('/', userController.findAll);
router.post('/', userController.create);
router.delete('/:id', userController.delete);
router.put('/:id', userController.update);

module.exports = router;
