const postManager = require('../utils/postManager');
const messages = require('../utils/message');
const db = require('../db');
const { validationResult } = require('express-validator');
const Boom = require('@hapi/boom');

async function getPosts(req, res) {
  try {
    // OBTENGO LOS DATOS DE LOS POTS
    const options = {
      include: [
        {
          model: db.category,
          as: 'category',
        },
      ],
    };
    const posts = await postManager.getAllData(db.posts, options);

    //  SI EXISTE ALGUN POSTS
    if (posts) {
      // DEVUELVO LOS POSTS
      messages.messageWithoutError(res, 'All posts', posts);
    }
  } catch (err) {
    console.log(err);
    messages.messageWithError(res, 'Contact a Administrador', 500, err);
  }
}

async function getPost(req, res) {
  try {
    const { id } = req.params;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = Boom.badRequest();
      error.output.payload.details = errors.array();

      throw error;
    }

    const options = {
      where: { id },
      include: [
        {
          model: db.category,
          as: 'category',
        },
      ],
    };

    const post = await postManager.getOneData(db.posts, options);

    if (post) {
      messages.messageWithoutError(res, `Post ID: ${id}`, post);
    }
  } catch (err) {
    messages.messageWithError(
      res,
      err.output.payload.message,
      err.output.statusCode,
      err.output.payload.details
    );
  }
}

async function createPost(req, res, next) {
  try {
    const { title, content, image, category } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = Boom.badRequest();
      error.output.payload.details = errors.array();
      throw error;
    }

    // CREO EL POST
    const post = {
      title,
      content,
      image,
      categoryID: category,
    };

    const postCreated = await postManager.createItem(db.posts, post, 201);

    if (postCreated) {
      messages.messageWithoutError(res, 'Post created succesfuly', {
        created: true,
        data: postCreated,
      });
    } else {
      messages.messageWithoutError(
        res,
        'The post couldnt be created, Contact a Administrator',
        { created: false, data: null },
        200
      );
    }
  } catch (err) {
    messages.messageWithError(
      res,
      err.output.payload.message,
      err.output.statusCode,
      err.output.payload.details
    );
  }
}

async function editPost(req, res) {
  try {
    const { id } = req.params;
    const { title, content, image, category } = req.body;

    const errors = validationResult(req).array();

    if (errors.length > 0) {
      const error = [];
      const errorId = [];
      errors.map((err) => {
        error.push(err.msg);
      });

      throw Boom.badData(error);
    }

    const categoryExist = await postManager.createIfNoExist(
      db.category,
      { name: category },
      { name: category }
    );

    const post = {
      title,
      content,
      image,
      categoryID: categoryExist.data.id,
    };

    const options = { where: { id } };

    const editedItem = await postManager.editData(db.posts, post, options);

    if (editedItem) {
      messages.messageWithoutError(res, 'Post edited succesfuly', { edited: true });
    } else {
      messages.messageWithoutError(res, 'Post doesnt exist', { edited: false }, 404);
    }
  } catch (err) {
    messages.messageWithError(
      res,
      err.output.payload.message,
      err.output.statusCode,
      err.output.payload.error
    );
  }
}

async function deletePost(req, res) {
  try {
    const { id } = req.params;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = Boom.badRequest();
      error.output.payload.details = errors.array();

      throw error;
    }

    const options = {
      where: {
        id,
      },
    };

    const deletedItem = await postManager.deleteData(db.posts, options);

    if (deletedItem) {
      messages.messageWithoutError(res, 'Post deleted succesfuly', { deleted: true });
    } else {
      // DEVUELVO QUE NO EXISTE EL POST
      messages.messageWithoutError(res, 'Post doesnt exist', { deleted: false }, 404);
    }
  } catch (err) {
    messages.messageWithError(
      res,
      err.output.payload.message,
      err.output.statusCode,
      err.output.payload.details
    );
  }
}

module.exports = {
  getPosts,
  getPost,
  createPost,
  deletePost,
  editPost,
};
