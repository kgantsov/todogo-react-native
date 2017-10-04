export const initialState = {
  todoLists: [],
  loading: false,
  todoListFormData: {
    title: null,
  },
};

export const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_TODO_LISTS':
      return {
        ...state,
        todoLists: action.payload,
      };
    case 'UPDATE_LOADING_FLAG':
      return {
        ...state,
        loading: action.payload,
      };
    case 'UPDATE_TODO_LIST_FORM_DATA':
      return {
        ...state,
        todoListFormData: action.payload,
      };
    default:
      return state;
  }
};
