export const createTodo=(todo)=>{
    //Just ref
    return (dispatch,getState)=>{
        dispatch ({type:'CREATE_TODO'},todo)
    }
}