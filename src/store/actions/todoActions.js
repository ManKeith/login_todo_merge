export const createTodo = (allItems) => {
    return (dispatch, getState, {getFirestore}) => {
      // make async call to database
      const firestore = getFirestore();
      firestore.collection('todos').add({
        ...allItems,
        title:'Eat',
        completed:false,
      }).then(() => {
        dispatch({ type: 'CREATE_TODO_SUCCESS' });
      }).catch(err => {
        dispatch({ type: 'CREATE_TODO_ERROR' }, err);
      });
    }
  };