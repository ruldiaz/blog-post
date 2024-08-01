// src/components/Post/PostDetail.js

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, deletePost, updatePost } from '../../redux/actions/postActions'; // Import actions
import './PostDetail.scss'; // Import the SCSS file

const PostDetail = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ title: '', content: '', image: '' });

  useEffect(() => {
    if (!posts.length) {
      dispatch(fetchPosts());
    }
  }, [dispatch, posts.length]);

  const post = posts.find((p) => p._id === postId);

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        content: post.content,
        image: post.image,
      });
    }
  }, [post]);

  const handleDelete = async () => {
    try {
      await dispatch(deletePost(postId));
      navigate('/'); // Redirect to home after deletion
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updatePost(postId, formData));
      setIsEditing(false); // Exit edit mode
    } catch (error) {
      console.error('Failed to update post:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (!post) return <p>Post not found</p>;

  return (
    <div className="post-detail">
      {isEditing ? (
        <form onSubmit={handleUpdate}>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">Content:</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Image URL:</label>
            <input
              type="text"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <>
          <h1>{post.title}</h1>
          <img
            src={post.image || 'https://via.placeholder.com/800x400'}
            alt={post.title || 'Post image'}
            className="post-image"
          />
          <p>{post.content}</p>
          <p className="post-date">{new Date(post.createdAt).toLocaleDateString()}</p>

          {/* Show edit/delete buttons if the user is the owner */}
          {user && user._id === post.author._id && (
            <div className="post-actions">
              <button onClick={() => setIsEditing(true)}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PostDetail;
