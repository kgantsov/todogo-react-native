export const initialState = {
  todos: [],
  loading: false,
  todoListId: null,
  todo: null,
  todoFormData: {
    title: null,
  },
};

export const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_TODOS':
      return {
        ...state,
        todos: action.payload,
      };
    case 'UPDATE_TODO_LIST_ID':
      return {
        ...state,
        todoListId: action.payload,
      };
    case 'UPDATE_TODO':
      return {
        ...state,
        todo: action.payload,
      };
    case 'UPDATE_TODOS_LOADING_FLAG':
      return {
        ...state,
        loading: action.payload,
      };
    case 'UPDATE_TODO_FORM_DATA':
      return {
        ...state,
        todoFormData: action.payload,
      };
    default:
      return state;
  }
};
