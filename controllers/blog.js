const Blog = require("../models/blog");
const { badResponse, goodResponseDoc } = require("../utils/response");
const { getMany, getOne } = require("../utils/factoryFunction");

exports.createBlog = async (req, res) => {
  try {
    const { title, body, author, description } = req.body;
    if (!title) badResponse(res, "Provide blog title");
    if (!body) badResponse(res, "provide body of blog");
    if (!author) badResponse(res, "Provide Author");
    if (!description) badResponse(res, "Provide blog description");

    const blog = await Blog.create({
      title,
      body,
      author,
      description
    });

    goodResponseDoc(res, "Blog created", 201, blog);
  } catch (error) {
    badResponse(res, error.message);
  }
};

exports.getAllBlogs = getMany(Blog);
exports.getABlog = getOne(Blog);
