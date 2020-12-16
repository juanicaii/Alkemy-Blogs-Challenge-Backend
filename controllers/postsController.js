const functions = require('../utils/functions');
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
    const posts = await functions.getAllData(db.posts, options);
    //  SI EXISTE ALGUN POSTS
    if (posts) {
      // DEVUELVO LOS POSTS
      messages.messageWithoutError(res, 'All posts', posts);
    }
  } catch (err) {
    messages.messageWithError(res, 'Contact a Administrador', 500, err);
  }
}

async function getPost(req, res) {
  try {
    // OBTENGO EL ID DE LOS PARAMS
    const { id } = req.params;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // SI HAY ERRORES MUESTRO EL ERROR
      const error = Boom.badRequest();
      Object.assign(error.output.payload, { details: errors.array() });

      throw error;
    }
    // OPCIONES DE LA QUERY
    const options = {
      where: { id },
      include: [
        {
          model: db.category,
          as: 'category',
        },
      ],
    };
    // TRAIGO EL POST CON EL ID
    const post = await functions.getOneData(db.posts, options);

    //  SI EXISTE SE LO MANDO
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
    // OBTENDO EL POST DEL BODY
    const { title, content, image, category } = req.body;
    const errors = validationResult(req);

    // VERIFICO QUE NO HAYA ERRORES
    if (!errors.isEmpty()) {
      // SI HAY ERRORES MUESTRO EL ERROR
      const error = Boom.badRequest();
      Object.assign(error.output.payload, { details: errors.array() });

      throw error;
    }

    // CREO EL POST
    const post = {
      title,
      content,
      image,
      categoryID: category,
    };

    const postCreated = await functions.createItem(db.posts, post, 201);

    // VERIFICO SI SE CREO
    if (postCreated) {
      // SI SE CREO DEVUELVO QUE SE CREO
      messages.messageWithoutError(res, 'Post created succesfuly', {
        created: true,
        data: postCreated,
      });
    } else {
      // SI NO DEVUELVO ERROR
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
    // OBTENGO EL ID DEL PARAM Y EL BODY
    const { id } = req.params;
    const { title, content, image, category } = req.body;

    const errors = validationResult(req).array();

    // VERIFICO QUE NO HAYA ERRORES
    if (errors.length > 0) {
      // SI HAY ERRORES MUESTRO EL ERROR
      const error = [];
      const errorId = [];
      errors.map((err) => {
        error.push(err.msg);
      });

      throw Boom.badData(error);
    }

    // VERIFICAMOS QUE LA IMAGEN SEA UNA IMAGEN

    // SI NO EXISTE LA CATEGORIA LA CREO
    const categoryExist = await functions.createIfNoExist(
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

    const editedItem = await functions.editData(db.posts, post, options);

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
    // OBTENGO ID DEL PARAMS
    const { id } = req.params;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // SI HAY ERRORES MUESTRO EL ERROR
      const error = Boom.badRequest();
      Object.assign(error.output.payload, { details: errors.array() });

      throw error;
    }
    // OPCIONES DE LA QUERY
    const options = {
      where: {
        id,
      },
    };
    // ELIMINO EL ITEM
    const deletedItem = await functions.deleteData(db.posts, options);

    // SI SE ELIMINO
    if (deletedItem) {
      // DEVUELVO QUE SE ELIMINO
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
