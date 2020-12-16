module.exports = { getAllData, getOneData };

function getAllData(model, options = {}) {
  return model.findAll(options).then((foundsItem) => {
    if (!foundsItem) {
      return null;
    }
    return foundsItem;
  });
}

function getOneData(model, options) {
  return model.findOne(options).then((foundItem) => {
    if (!foundItem) {
      return null;
    }
    return foundItem;
  });
}
