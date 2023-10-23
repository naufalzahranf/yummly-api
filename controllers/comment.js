/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable linebreak-style */
/* eslint-disable arrow-spacing */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
const db = require('../models');

const Comment = db.comments;

exports.findAll = async (req, res) => {
  try {
    const comments = await Comment.findAll();
    res.json({
      code: 200,
      message: 'Comments retrieved successfully.',
      data: comments,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: error.message || 'Some error occurred while retrieving comments.',
      data: null,
    });
  }
};

exports.create = async (req, res) => {
  try {
    const user = {
      text: req.body.text,
      user_id: req.body.user_id,
      recipe_id: req.body.recipe_id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const data = await Comment.create(user);
    res.json({
      code: 200,
      message: 'Comment created successfully',
      data,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: error.message || 'Some error occurred while creating the Comment.',
      data: null,
    });
  }
};

// eslint-disable-next-line consistent-return
exports.delete = async (req, res)=> {
  try {
    const commentId = req.params.id;
    // Menggunakan "where" untuk mengidentifikasi data yang akan dihapus berdasarkan ID
    const result = await Comment.destroy({
      where: {
        id: commentId,
      },
    });

    if (result === 0) {
      return res.status(404).json({
        message: 'Comment not found',
        data: null,
      });
    }

    res.json({
      code: 200,
      message: 'Comment deleted successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: error.message || 'Some error occurred while deleting the Comment.',
      data: null,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const commentId = req.params.id;
    const updatedCommentData = {
      text: req.body.text,
      user_id: req.body.user_id,
      recipe_id: req.body.recipe_id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const [rowsUpdated, [updatedComment]] = await Comment.update(updatedCommentData, {
      where: { id: commentId },
      returning: true,
    });

    if (rowsUpdated === 0) {
      return res.status(404).json({
        message: 'Comment not found',
        data: null,
      });
    }

    res.json({
      code: 200,
      message: 'Comment updated successfully',
      data: updatedComment,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: error.message || 'Some error occurred while updating the Comment.',
      data: null,
    });
  }
};
