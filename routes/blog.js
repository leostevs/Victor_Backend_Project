const express = require('express');
const { createBlog, getAllBlogs, getABlog } = require('../controllers/blog');
const Router = express.Router();

Router.route('/create').post(createBlog);
Router.route('/').get(getAllBlogs)
Router.route('/:id').get(getABlog)
module.exports = Router;