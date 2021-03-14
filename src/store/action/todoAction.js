export const createTodo = (item)=>{
    return(dispatch,getState)=>{
    //make async call
    dispatch({type: 'ADD_TODO'},item)
    }
}