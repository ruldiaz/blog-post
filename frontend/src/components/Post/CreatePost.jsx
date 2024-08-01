import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createPost } from '../../redux/actions/postActions'; // Import the action to create a post
import './CreatePost.scss'; // Import your styles

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      image: '',
      successMessage: '', // Add state for success message
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { user } = this.props;

    // Debugging
    console.log('User:', user); // Log user object
    if (!user || !user._id) {
      console.error('User is not authenticated or _id is missing');
      return;
    }

    try {
      // Adding the author's ID to formData
      const postData = { ...this.state, author: user._id };
      await this.props.createPost(postData); // Dispatch the createPost action
      
      // Set success message and clear form data after successful submission
      this.setState({
        title: '',
        content: '',
        image: '',
        successMessage: 'Post created successfully',
      });
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  render() {
    const { title, content, image, successMessage } = this.state;

    return (
      <div className="create-post">
        <h2>Create a New Post</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">Content:</label>
            <textarea
              id="content"
              name="content"
              value={content}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Image URL:</label>
            <input
              type="text"
              id="image"
              name="image"
              value={image}
              onChange={this.handleInputChange}
            />
          </div>
          <button type="submit">Create Post</button>
        </form>
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = {
  createPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);
