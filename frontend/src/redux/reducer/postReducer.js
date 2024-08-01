// src/redux/reducers/postReducer.js

import {
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAILURE,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
} from '../actions/types';

const initialState = {
  posts: [],
  error: null,
  loading: false,
  currentPage: 1,
  totalPages: 1,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload.posts,  // Assuming action.payload contains the post data
        currentPage: action.payload.currentPage, // Get currentPage from action
        totalPages: action.payload.totalPages,   // Get totalPages from action
        error: null,
      };
    case FETCH_POSTS_FAILURE:
      return {
        ...state,
        posts: [],
        error: action.payload,
      };
    case CREATE_POST_SUCCESS:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        error: null,
      };
    case CREATE_POST_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case UPDATE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
        error: null,
      };
    case UPDATE_POST_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
        error: null,
      };
    case DELETE_POST_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default postReducer;
