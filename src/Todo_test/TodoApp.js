import React, { useState, useEffect } from "react";
import "./TodoApp.css";
import firebase from "../Components/config/firebaseConfig";
import { Redirect } from 'react-router-dom'
// import firebase from 'firebase';
import {
  DeleteOutlineRounded,
  Edit
} from "@material-ui/icons";
import {
  Button,
  TextField,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Dialog,
  DialogContent,
  DialogActions
} from "@material-ui/core";
const firestore = firebase.firestore();

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState("");
  const [toUpdateId, setToUpdateId] = useState("");
  const [isDone, setIsDone] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [filteredTodo, setFilteredTodo] = useState([]);

  const filterID = "bNREmY6c40RYpDyh4bRL";

  useEffect(() => {
    firestore
      .collection("todos")
      .orderBy("datetime", "asc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              name: doc.data().todo,
              datatime: doc.data().datatime,
              isDone: doc.data().isDone
            };
          })
        );
      });
  }, []);

  const addTodo = (event) => {
    event.preventDefault();
    if(input !==""){
    firestore.collection("todos").add({
      todo: input,
      datetime: firebase.firestore.FieldValue.serverTimestamp(),
      isDone: false
    });
    }
    setInput("");
  };

  const deleteTodo = (id) => {
    firestore
      .collection("todos")
      .doc(id)
      .delete()
      .then((res) => {
        console.log("Deleted!", res);
      });
  };

  const openUpdateDialog = (todo) => {
    setOpen(true);
    setToUpdateId(todo.id);
    setUpdate(todo.name);
  };

  const editTodo = (id) => {
    firestore.collection("todos").doc(toUpdateId).update({
      todo: update
    });
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const updateDone = (todo) => {
    firestore.collection("todos").doc(todo.id).update({
      isDone: !todo.isDone
    });
  };
  const toFilter = (todos) => {
    //console.log(todos.id)
    setTodos(todos.filter((todo) => todo.isDone === true));
  };
  const notFilter = (todos) => {
    firestore
      .collection("todos")
      .orderBy("datetime", "desc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              name: doc.data().todo,
              datatime: doc.data().datatime,
              isDone: doc.data().isDone
            };
          })
        );
      });
    console.log(firestore.collection("todos"));
    //setTodos();
  };
  const filterDone = () => {
    if (isFilter) {
      notFilter(todos);
      setIsFilter(false);
    } else {
      toFilter(todos);
      setIsFilter(true);
    }
    firestore.collection("Filter").doc(filterID).update({});
    console.log("isFilter:" + isFilter);
    //console.log(filteredTodo);
  };

  return (
    <div className="outterBox_">
      <h2 id="header_todo">Todo List</h2>
      <Container maxWidth="sm">
        <form id="todo-form" noValidate>
          <input
            type="text"
            placeholder="Add your task here."
            value={input}
            autoFocus
            onChange={(event) => setInput(event.target.value)}
          />
          <button type="submit" onClick={addTodo}>
            Add
          </button>
        </form>
        <label id="filterBox">
          <input type="checkbox" checked={isFilter} onClick={filterDone} />
          <span>Show completed task</span>
        </label>

        <List  dense={true}>
          {todos.map((todo) => (
            <ListItem id="itemsList" key={todo.id}>
              <label>
                <input
                  type="checkbox"
                  checked={todo.isDone}
                  onChange={() => updateDone(todo)}
                />
                <span> </span>
              </label>
              <ListItemText id="itemsContent"
                primary={todo.name}
                secondary={todo.datetime}
                // tertiary={todo.isDone}
              />

              <ListItemSecondaryAction>
                
              </ListItemSecondaryAction>
              <IconButton
                  edge="end"
                  aria-label="Edit"
                  onClick={() => openUpdateDialog(todo)}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => deleteTodo(todo.id)}
                >
                  <DeleteOutlineRounded />
                </IconButton>
            </ListItem>
          ))}
        </List>

        <Dialog id="DL" open={open} onClose={handleClose}>
          <DialogContent id="DLbox">
            <TextField id="DLbox_text"
              autoFocus
              margin="normal"
              label="Update Todo"
              type="text"
              fullWidth
              name="updateTodo"
              value={update}
              onChange={(event) => setUpdate(event.target.value)}
            />
          </DialogContent>
          <DialogActions id="DLactions">
            <Button onClick={handleClose} >
              Cancel
            </Button>
            <Button onClick={editTodo} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
}

export default App;
