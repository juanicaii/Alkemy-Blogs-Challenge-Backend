const functionsCreate = require('../utils/functions/createFunctions');
const messages = require('../utils/messages/message');
const db = require('../db');
module.exports = {
  getPosts,
  getPost,
  createPost,
  deletePost,
  editPost,
};

async function getPosts(req, res) {}

async function getPost(req, res) {}

async function createPost(req, res) {
  try {
    // OBTENDO EL POST DEL BODY
    const { title, content, image, category } = req.body;

    // CREO EL POST
    const post = {
      title,
      content,
      image,
      categoryID: category,
    };

    const postCreated = await functionsCreate.createItem(db.posts, post);

    // VERIFICO SI SE CREO
    if (postCreated) {
      messages.messageWithoutError(res, 'Post created succesfuly', postCreated);
    } else {
      messages.messageWithError(res, 'The post couldnt be created, Contact a Administrator', 500);
    }
  } catch (err) {
    messages.messageWithError(res, 'Contact a Administrator', 500);
  }
}

async function editPost(req, res) {}

async function deletePost(req, res) {}
