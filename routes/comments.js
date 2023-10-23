/* eslint-disable linebreak-style */
const express = require('express');
const commentController = require('../controllers').Comment;

const router = express.Router();

/* GET users listing. */
// eslint-disable-next-line no-unused-vars
router.get('/', commentController.findAll);
router.post('/', commentController.create);
router.delete('/:id', commentController.delete);
router.put('/:id', commentController.update);

module.exports = router;
