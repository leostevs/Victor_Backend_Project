const express =  require('express');
const { getAllUsers, getAUser } = require('../controllers/users');
const Router = express.Router();

Router.route('/').get(getAllUsers)

Router.route('/:id').get(getAUser)

module.exports = Router;