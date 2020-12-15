module.exports = {
  createIfNoExist,
  createItem,
};

function createIfNoExist(model, data, where = {}) {
  return model
    .findOne({
      where,
      raw: true,
    })
    .then((foundItem) => {
      if (!foundItem) {
        model.create(data);
        return { found: false, data };
      }

      return { found: true, foundItem };
    });
}

function createItem(model, data) {
  return model.create(data).then((item) => {
    if (!item) {
      return null;
    }

    return item;
  });
}
