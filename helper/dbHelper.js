const mongoose = require('mongoose');
const constants = require('../constants');

module.exports.formatMongoData = (data) => {
  if (Array.isArray(data)) {
    let newDataList = [];
    data.forEach((value) => {
      newDataList.push(value.toObject());
      // for (value of data) {
      //   newDataList.push(value.toObject());
      // }
      // return newDataList;
    });
    return newDataList;
}
return data.toObject();
}

module.exports.checkObjectId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error(constants.databaseMessage.INVALID_ID);
  }
}