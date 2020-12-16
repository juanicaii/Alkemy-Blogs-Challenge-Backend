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
    .then(async (foundItem) => {
      if (!foundItem) {
        const itemCreated = await model.create(data, { raw: true });
        return { found: false, data: itemCreated };
      }
      return { found: true, data: foundItem };
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
