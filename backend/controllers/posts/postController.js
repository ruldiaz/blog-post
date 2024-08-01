// backend/controllers/posts/postController.js
const asyncHandler = require('express-async-handler');
const Post = require('../../models/Post/Post');

const postController = {
  // CREATE POST CONTROLLER
  createPost: asyncHandler(async (req, res) => {
    // Get the payload and add the authenticated user as the author
    const { title, content, image } = req.body;
    const author = req.user._id; // Use the authenticated user's ID

    const postCreated = await Post.create({ title, content, image, author });

    res.json({
      status: 'success',
      message: 'Post created successfully',
      postCreated,
    });
  }),

// READ ALL POSTS WITH PAGINATION
fetchAllPosts: asyncHandler(async (req, res) => {
  const { page = 1, limit = 6 } = req.query; // Default to page 1, limit 6

  const postCount = await Post.countDocuments();
  const postData = await Post.find()
    .populate('author', 'username')
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  res.json({
    status: 'success',
    message: 'Fetching posts successfully',
    postData, // Send the posts for the current page
    currentPage: parseInt(page),
    totalPages: Math.ceil(postCount / limit), // Calculate total pages
  });
}),

  // READ SINGLE POST
  getPost: asyncHandler(async (req, res) => {
    const postId = req.params.postId;
    const postFound = await Post.findById(postId).populate('author', 'username');

    if (!postFound) {
      throw new Error('Post not found');
    }

    res.json({
      status: 'Post fetched successfully',
      postFound,
    });
  }),

  // DELETE POST
  deletePost: asyncHandler(async (req, res) => {
    const postId = req.params.postId;
    const postFound = await Post.findById(postId);

    if (!postFound) {
      throw new Error('Post not found');
    }

    // Check if the authenticated user is the author
    if (postFound.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized action' });
    }

    const postDeleted = await Post.findByIdAndDelete(postId);

    res.json({
      status: 'Post deleted successfully',
      postDeleted,
    });
  }),

    // UPDATE POST
    updatePost: asyncHandler(async (req, res) => {
      const postId = req.params.postId;
      const postFound = await Post.findById(postId);

      if (!postFound) {
        throw new Error('Post not found');
      }

      // Check if the authenticated user is the author
      if (postFound.author.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Unauthorized action' });
      }

      // Update post if found
      const { title, content } = req.body;
      const postUpdated = await Post.findByIdAndUpdate(
        postId,
        { title, content },
        { new: true }
      );

      res.json({
        status: 'success',
        postUpdated,
      });
    }),
};

module.exports = postController;
