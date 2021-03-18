import React, { useState, useEffect } from 'react';
import './TodoApp.css';
import firebase from '../Components/config/firebaseConfig'
// import firebase from 'firebase';
import { AddCircleOutlineRounded, DeleteOutlineRounded, Edit } from '@material-ui/icons';
import { Button, TextField, Container, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Dialog, DialogContent, DialogActions } from '@material-ui/core';
const firestore = firebase.firestore();

function App() {

  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState('');
  const [toUpdateId, setToUpdateId] = useState('');
  const [isDone, setIsDone] = useState(false);
 
  //const [isChecked, setisChecked] = useState('');
 const filterID=  "bNREmY6c40RYpDyh4bRL";
 var isFilter = new Boolean(false);
 var isLocalFilter = new Boolean(false);
 var filteredTodo = todos;
//  console.log(filteredTodo);
 isFilter=firestore.collection('Filter').doc(filterID).isFilter;
 //console.log('isFilter:' +isFilter)
 isLocalFilter=isFilter;
  useEffect(() => {
    firestore.collection('todos').orderBy('datetime', 'desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => {
        return {
          id: doc.id,
          name: doc.data().todo,
          datatime: doc.data().datatime,
          isDone: doc.data().isDone
        }
      }))
    })

  }, []);

  const addTodo = (event) => {
    event.preventDefault();
    firestore.collection('todos').add({
      todo: input,
      datetime: firebase.firestore.FieldValue.serverTimestamp(),
      isDone:false
    })
    setInput('');
  }

  const deleteTodo = (id) => {
    firestore.collection('todos').doc(id).delete().then(res => {
      console.log('Deleted!', res);
    });
  }

  const openUpdateDialog = (todo) => {
    setOpen(true);
    setToUpdateId(todo.id);
    setUpdate(todo.name);
  }

  const editTodo = (id) => {
    firestore.collection('todos').doc(id).update({
      todo: update
    });
    setOpen(false);
  }

  const handleClose = () => {
    setOpen(false);
  };
 const updateDone =(todo) =>{
    firestore.collection('todos').doc(todo.id).update({
        isDone: !todo.isDone
    });
 }
const filterDone = () => {
    if(isLocalFilter){
        toFilter(todos);
    }
    else{
       filteredTodo = todos;
    }
    firestore.collection('Filter').doc(filterID).update({
        isFilter: !isLocalFilter
  });
    console.log(filteredTodo.id);
    console.log(isLocalFilter);
    isLocalFilter= !isLocalFilter;
 }
 const toFilter =(todos) =>{
     console.log(todos.id)
    filteredTodo =todos.filter(todo =>todo.isDone===true);
    
 }
  return (
    <div className="outterBox_">
    <h1>Todo List</h1>
    <Container maxWidth="sm">
    <form id="todo-form" noValidate>
        <input 
        type="text" 
        placeholder="Add your task here." 
        value={input}
        autoFocus
        onChange={event => setInput(event.target.value)}
        />
        <button type="submit" onClick={addTodo}>Add</button>
    </form>
    <label>
        <input type="checkbox" checked={isFilter}
            onClick={filterDone}
        />
        <span>Show completed task</span>
    </label>

      <List dense={true}>
        {
          todos.map(todo => (
            
            <ListItem key={filteredTodo.id} >
              <label>
                <input type="checkbox" checked={todo.isDone}
                  onChange={() => updateDone(todo)}
              />
              <span> </span>
              </label>
              <ListItemText
                primary={todo.name}
                secondary={todo.datetime}
                // tertiary={todo.isDone}
              />

              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="Edit" onClick={() => openUpdateDialog(todo)}>
                  <Edit />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => deleteTodo(todo)}>
                  <DeleteOutlineRounded />
                </IconButton>
              </ListItemSecondaryAction>

            </ListItem>
          ))
        }
      </List>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <TextField
            autoFocus
            margin="normal"
            label="Update Todo"
            type="text"
            fullWidth
            name="updateTodo"
            value={update}
            onChange={event => setUpdate(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={editTodo} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>


    </Container >
    </div>
  );
}

export default App;
