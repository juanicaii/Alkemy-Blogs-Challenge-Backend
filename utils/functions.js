module.exports = {
  createIfNoExist,
  createItem,
  getAllData,
  getOneData,
  deleteData,
  editData,
};

const actions = {
  true: 1,
  false: 0,
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

function deleteData(model, options) {
  return model.destroy(options).then((deletedItem) => {
    if (deletedItem == actions.false) {
      return false;
    }

    return true;
  });
}

function editData(model, data, options) {
  return model.update(data, options).then((editedItem) => {
    if (editedItem == actions.false) {
      return false;
    }
    return true;
  });
}
