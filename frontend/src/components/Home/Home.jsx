import React, { useEffect } from 'react';
import './Home.scss'; // Import the SCSS file
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../redux/actions/postActions'; // Import fetchPosts action

const Home = () => {
  const dispatch = useDispatch();
  const { posts, loading, error, currentPage, totalPages } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts(currentPage)); // Fetch posts for the current page
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      dispatch(fetchPosts(page)); // Dispatch action to fetch new page
    }
  };

  if (loading) return <p>Loading posts...</p>; // Display loading message
  if (error) return <p>Error fetching posts: {error}</p>; // Display error message

  // Ensure posts is an array before mapping
  if (!posts || !Array.isArray(posts)) return <p>No posts available.</p>;

  return (
    <>
      <section className="main-article">
        <h1>Blog</h1>
      </section>
      <section className="featured-posts">
        <h2>Featured Posts</h2>
        <div className="posts-container">
          {posts.map((post) => (
            <div className="post-card" key={post._id}>
              <h3>{post.title}</h3>
              <img
                src={post.image || 'https://via.placeholder.com/800x400'} // Fallback image if none
                alt={post.title || 'Post image'}
                className="post-image"
              />
              <Link to={`/post/${post._id}`}>
                <p>Read more ++</p>
              </Link>
              <p className="post-date">{new Date(post.createdAt).toLocaleDateString()}</p> {/* Format date */}
            </div>
          ))}
        </div>
        {/* Pagination Controls */}
        <div className="pagination">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={index + 1 === currentPage ? 'active' : ''}
            >
              {index + 1}
            </button>
          ))}
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </section>
    </>
  );
};

export default Home;
