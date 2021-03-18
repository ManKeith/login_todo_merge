const initState = {}

const todoReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_TODO_SUCCESS':
      console.log('create todo success');
      return state;
    case 'CREATE_TODO_ERROR':
      console.log('create todo error');
      return state;
    default:
      return state;
  }
};

export default todoReducer;