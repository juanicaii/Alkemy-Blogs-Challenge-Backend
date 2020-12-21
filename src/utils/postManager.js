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
async function createIfNoExist(model, data, where = {}) {
  const foundItem = await model.findOne({
    where,
    raw: true,
  });

  if (!foundItem) {
    const itemCreated = await model.create(data, { raw: true });
    return { found: false, data: itemCreated };
  }
  return { found: true, data: foundItem };
}

async function createItem(model, data) {
  const item = await model.create(data);
  if (!item) {
    return null;
  }

  return item;
}

async function getAllData(model, options = {}) {
  const foundsItem = await model.findAll(options, { raw: true });

  if (!foundsItem) {
    return null;
  }
  return foundsItem;
}

async function getOneData(model, options) {
  const foundItem = await model.findOne(options);
  if (!foundItem) {
    return null;
  }
  return foundItem;
}

async function deleteData(model, options) {
  const deletedItem = await model.destroy(options);
  return deletedItem[0] !== actions.false;
}

async function editData(model, data, options) {
  const editedItem = await model.update(data, options);
  return editedItem[0] !== actions.false;
}
