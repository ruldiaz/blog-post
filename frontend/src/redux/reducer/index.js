  // src/redux/reducers/authReducer.js

  const initialState = {
    user: null,
    loggedIn: false,
    error: null,
  };

  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          user: action.payload,
          loggedIn: true,
          error: null,
        };
      case 'LOGIN_FAILURE':
        return {
          ...state,
          user: null,
          loggedIn: false,
          error: action.payload,
        };
      case 'LOGOUT_SUCCESS':
        return {
          ...state,
          user: null,
          loggedIn: false,
          error: null,
        };
      case 'LOGOUT_FAILURE':
        return {
          ...state,
          error: action.payload,
        }
      case 'REGISTER_SUCCESS':
        return {
          ...state,
          user: action.payload,
          error: null,
        };
      case 'REGISTER_FAILURE':
        return {
          ...state,
          user: null,
          error: action.payload,
        };
      case 'SET_AUTH':
        return {
        ...state,
        user: action.payload.user,
        loggedIn: action.payload.isAuthenticated,
        error: null,
      };
      case 'SET_AUTH_ERROR':
         return {
        ...state,
        loggedIn: false,
        error: action.payload,
        };
      default:
        return state;
    }
  };

  export default authReducer;
