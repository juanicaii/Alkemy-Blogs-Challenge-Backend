const imageTypeDic = require('../utils/imageType');
const db = require('../db');
const postManager = require('../utils/postManager');

const schemeValidationPost = {
  title: {
    in: ['body'],
    errorMessage: 'The title is wrong',
    isString: true,
    exists: {
      errorMessage: 'The title cant be empty',
    },
  },
  content: {
    in: ['body'],
    exists: {
      errorMessage: 'The content cant be empty',
    },
    isString: true,
  },
  image: {
    in: ['body'],

    exists: {
      errorMessage: 'The image cant be empty',
    },
    isString: true,
    custom: {
      options: (value) => {
        if (
          value.substr(value.length - 4) == imageTypeDic.jpg ||
          value.substr(value.length - 4) == imageTypeDic.png
        ) {
          return value;
        } else {
          throw new Error('Invalid Image');
        }
      },
    },
  },

  category: {
    in: ['body'],
    errorMessage: 'The category is wrong',
    exists: {
      errorMessage: 'The category cant be empty',
    },
    isString: true,
    customSanitizer: {
      options: async (value) => {
        if (value) {
          const categoryExist = await postManager.createIfNoExist(
            db.category,
            { name: value },
            { name: value }
          );
          return categoryExist.data.id;
        }
      },
    },
  },
};

module.exports = schemeValidationPost;
