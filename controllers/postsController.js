const functionsCreate = require('../utils/functions/createFunctions');
const functionsFind = require('../utils/functions/findFuntions');
const messages = require('../utils/messages/message');
const db = require('../db');
module.exports = {
  getPosts,
  getPost,
  createPost,
  deletePost,
  editPost,
};

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
    const posts = await functionsFind.getAllData(db.posts, options);
    //  SI EXISTE ALGUN POSTS
    if (posts) {
      // DEVUELVO LOS POSTS
      messages.messageWithoutError(res, 'All posts', posts);
    }
  } catch (err) {
    messages.messageWithError(res, 'Contact a Administrador');
  }
}

async function getPost(req, res) {
  try {
    // OBTENGO EL ID DE LOS PARAMS
    const { id } = req.params;

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
    const post = await functionsFind.getOneData(db.posts, options);

    //  SI EXISTE SE LO MANDO
    if (post) {
      messages.messageWithoutError(res, `Post ID: ${id}`, post);
    }
  } catch (err) {
    messages.messageWithError(res, 'Contact a Administrator', err, 500);
  }
}

async function createPost(req, res) {
  try {
    // OBTENDO EL POST DEL BODY
    const { title, content, image, category } = req.body;

    // SI NO EXISTE LA CATEGORIA LA CREO
    const categoryExist = await functionsCreate.createIfNoExist(
      db.category,
      { name: category },
      { name: category }
    );

    // CREO EL POST
    const post = {
      title,
      content,
      image,
      categoryID: categoryExist.data.id,
    };

    const postCreated = await functionsCreate.createItem(db.posts, post);

    // VERIFICO SI SE CREO
    if (postCreated) {
      // SI SE CREO DEVUELVO QUE SE CREO
      messages.messageWithoutError(res, 'Post created succesfuly', postCreated);
    } else {
      // SI NO DEVUELVO ERROR
      messages.messageWithError(res, 'The post couldnt be created, Contact a Administrator', 500);
    }
  } catch (err) {
    messages.messageWithError(res, 'Contact a Administrator', 500);
  }
}

async function editPost(req, res) {}

async function deletePost(req, res) {
  try {
    const { id } = req.params;
  } catch (err) {
    messages.messageWithError(res, 'Contact a Administrator', 500);
  }
}
