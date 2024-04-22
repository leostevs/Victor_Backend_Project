const User = require("../models/user")
const { getMany, getOne } = require("../utils/factoryFunction")

exports.getAllUsers = getMany(User);
exports.getAUser = getOne(User)