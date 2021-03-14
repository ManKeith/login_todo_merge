const initState = {
    allItems: JSON.parse(localStorage.getItem('allItems'))||[]
  }
  
  const todoReducer = (state = initState, action) => {
    switch (action.type) {
      case 'CREATE_PROJECT':
        console.log('create project', action.project);
    }
    return state;
  };
  
  export default todoReducer;