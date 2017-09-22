
export const initialState = {
  token: null,
  loginForm: {
    email: null,
    password: null
  },
};


export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_FORM_DATA':
      return {
          ...state,
          loginForm: action.payload
      };
    case 'LOGIN_REQUEST':
      return {
          ...state,
          token: action.payload
      };
  default:
    return state;
  }
};
