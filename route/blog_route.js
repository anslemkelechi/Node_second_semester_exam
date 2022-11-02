const express = require('express');
const BlogController = require('../controller/blog_controller')

const blogRouter = express.Router()

blogRouter.get('/', BlogController.getBlogs)
 blogRouter.get('/:id', BlogController.getBlog)
 blogRouter.post('/', BlogController.createBlog)
 blogRouter.put('/:id', BlogController.updateBlog)
 blogRouter.delete('/:id', BlogController.deleteBlog)

module.exports = blogRouter
