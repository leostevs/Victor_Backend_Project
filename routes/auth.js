const express = require('express');
const { createUser, login } = require('../controllers/auth');
const Router = express.Router();

Router.route('/signup').post(createUser);
Router.route('/login').post(login)

module.exports = Router;