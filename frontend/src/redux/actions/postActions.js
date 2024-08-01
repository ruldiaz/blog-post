import axios from 'axios';
import { BASE_URL } from '../../utils/baseEndpoint';
import {
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAILURE,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
} from './types';

// Action to fetch all posts with pagination
export const fetchPosts = (page = 1, limit = 6) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${BASE_URL}/posts?page=${page}&limit=${limit}`);
      dispatch({
        type: FETCH_POSTS_SUCCESS,
        payload: {
          posts: response.data.postData,
          currentPage: response.data.currentPage,
          totalPages: response.data.totalPages,
        },
      });
    } catch (error) {
      dispatch({
        type: FETCH_POSTS_FAILURE,
        payload: error.message,
      });
    }
  };
};

  // Action to create a post
  export const createPost = (postData) => {
    return async (dispatch, getState) => {
      const { user } = getState().auth; // Get current user from auth state

      try {
        const response = await axios.post(
          `${BASE_URL}/posts/create`,
          { ...postData, author: user._id },
          {
            withCredentials: true,
          }
        );
        dispatch({
          type: CREATE_POST_SUCCESS,
          payload: response.data.postCreated,
        });
      } catch (error) {
        dispatch({
          type: CREATE_POST_FAILURE,
          payload: error.message,
        });
      }
    };
  };

  // Action to update a post
  export const updatePost = (postId, postData) => {
    return async (dispatch, getState) => {
      const { user } = getState().auth; // Get current user from auth state

      try {
        const response = await axios.put(
          `${BASE_URL}/posts/${postId}`,
          { ...postData, author: user._id },
          {
            withCredentials: true,
          }
        );
        dispatch({
          type: UPDATE_POST_SUCCESS,
          payload: response.data.postUpdated,
        });
      } catch (error) {
        dispatch({
          type: UPDATE_POST_FAILURE,
          payload: error.message,
        });
      }
    };
  };

  // Action to delete a post
  export const deletePost = (postId) => {
    return async (dispatch) => {
      try {
        await axios.delete(`${BASE_URL}/posts/${postId}`, {
          withCredentials: true,
        });
        dispatch({
          type: DELETE_POST_SUCCESS,
          payload: postId,
        });
      } catch (error) {
        dispatch({
          type: DELETE_POST_FAILURE,
          payload: error.message,
        });
      }
    };
  };
