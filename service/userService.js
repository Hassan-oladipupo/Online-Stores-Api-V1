const User = require('../database/models/userModel');
const constants = require('../constants');
const mongoDbDataFormat = require('../helper/dbHelper');
 const bcrypt = require('bcrypt');
 const jwt = require('jsonwebtoken');
 const validator = require("validator");


 //signup
module.exports.signup = async ({ email, password, firstName, lastName }) => {
  try {

    if (!validator.isEmail(email)) {
      throw new Error(constants.userMessage.INVALID_EMAIL);
    }
    const user = await User.findOne({ email });
    if (user) {
      throw new Error(constants.userMessage.DUPLICATE_EMAIL);
    }
    password = await bcrypt.hash(password, 12);
    const newUser = new User({ email, password, firstName, lastName });
    let result = await newUser.save();
    return mongoDbDataFormat.formatMongoData(result);
  } catch (error) {
    console.log('Something went wrong: Service: signup', error);
    throw new Error(error);
  }
}




//login 

module.exports.login = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email });
    if (!validator.isEmail(email)) {
      throw new Error(constants.userMessage.INVALID_EMAIL);
    }
    if (!user) {
      throw new Error(constants.userMessage.USER_NOT_FOUND);
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error(constants.userMessage.INVALID_PASSWORD);
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY || 'my-secret-key', { expiresIn: '1d' });
    const result = {
      user: mongoDbDataFormat.formatMongoData(user),
      token: token
    };

    return result;
   
  } catch (error) {
    console.log('Something went wrong: Service: login', error);
    throw new Error(error);
  }

}