export const initialState = {
  todoLists: [],
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_TODO_LISTS':
      return {
        ...state,
        todoLists: action.payload,
      };
    default:
      return state;
  }
};

export default loginReducer;
