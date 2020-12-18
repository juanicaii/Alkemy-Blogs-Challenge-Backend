const schemeValidationId = {
  id: {
    in: ['params'],
    isInt: {
      errorMessage: 'The id must be numeric',
    },
  },
};

module.exports = schemeValidationId;
