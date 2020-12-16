const imageTypeDic = require('../utils/imageType');
const db = require('../db');
const functions = require('../utils/functions');
const Boom = require('boom');

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
      options: (value) => {
        if (value) {
          return new Promise(async function (resolve, reject) {
            const categoryExist = await functions.createIfNoExist(
              db.category,
              { name: value },
              { name: value }
            );

            resolve(categoryExist.data.id);
          });
        }
      },
    },
  },
};

const schemeValidationId = {
  id: {
    in: ['params'],
    isInt: {
      errorMessage: 'The id must be numeric',
    },
  },
};

module.exports = {
  schemeValidationId,
  schemeValidationPost,
};
