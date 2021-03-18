import React, { useState, useEffect ,Component} from "react";
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

class Todo extends Component{
    constructor(props){
        super(props);
        this.state={
            todos:firestore.collection("todos").orderBy("datetime", "asc"),
            input:"",
            open:false,
            update:"",
            toUpdateId:"",
            isDone:false,
            isFilter:false,
            filteredTodo:[]
        }
        this.addTodo=this.addTodo.bind(this);
        this.deleteTodo=this.deleteTodo.bind(this);
        this.openUpdateDialog=this.openUpdateDialog.bind(this);
        this.editTodo=this.editTodo.bind(this);
        this.handleClose=this.handleClose.bind(this);
        this.updateDone = this.updateDone.bind(this);
        this.toFilter = this.toFilter.bind(this);
        this.notFilter = this.notFilter.bind(this);
        this.filterDone = this.filterDone.bind(this);
      }



//   useEffect(() => {
//     firestore
//       .collection("todos")
//       .orderBy("datetime", "asc")
//       .onSnapshot((snapshot) => {
//         this.state.todos=
//           snapshot.docs.map((doc) => {
//             return {
//               id: doc.id,
//               name: doc.data().todo,
//               datatime: doc.data().datatime,
//               isDone: doc.data().isDone
//             };
//           })
//         ;
//       });
//   }, []);

   addTodo = (event) => {
    event.preventDefault();
    if(this.state.input !==""){
    firestore.collection("todos").add({
      todo: this.state.input,
      datetime: firebase.firestore.FieldValue.serverTimestamp(),
      isDone: false
    });
    }
    this.state.input.setState("");
  };

   deleteTodo = (id) => {
    firestore
      .collection("todos")
      .doc(id)
      .delete()
      .then((res) => {
        console.log("Deleted!", res);
      });
  };

   openUpdateDialog = (todo) => {
    this.state.open.setState(true);
    this.state.toUpdateId.setState(todo.id);
    this.state.update.setState(todo.name);
  };

   editTodo = (id) => {
    firestore.collection("todos").doc(this.state.toUpdateId).update({
      todo: this.state.update
    });
    this.state.openset.State(false);
  };

   handleClose = () => {
    this.state.open.setState(false);
  };
   updateDone = (todo) => {
    firestore.collection("todos").doc(todo.id).update({
      isDone: !todo.isDone
    });
  };
   toFilter = (todos) => {
    //console.log(todos.id)
    this.state.todos.setState(todos.filter((todo) => todo.isDone === true));
  };
   notFilter = (todos) => {
    firestore
      .collection("todos")
      .orderBy("datetime", "desc")
      .onSnapshot((snapshot) => {
        this.state.todos.setState(
          snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              name: doc.data().todo,
              datatime: doc.data().datatime,
              isDone: doc.data().isDone
            };
          }))
        ;
      });
    console.log(firestore.collection("todos"));
    //setTodos();
  };
   filterDone = () => {
    if (this.state.isFilter) {
      this.notFilter(this.state.todos);
      this.state.isFilter.setState(false);
    } else {
        this.toFilter(this.state.todos);
      this.state.isFilter.setState(true);
    }
    firestore.collection("Filter").doc(this.state.filterID).update({});
    //console.log("isFilter:" + isFilter);
    //console.log(filteredTodo);
  };
render(){
    return (
        <div className="outterBox_">
        <h2 id="header_todo">Todo List</h2>
        <Container maxWidth="sm">
          <form id="todo-form" noValidate>
            <input
              type="text"
              placeholder="Add your task here."
              value={this.state.input}
              autoFocus
              onChange={(event) => this.state.input.setState(event.target.value)}
            />
            <button type="submit" onClick={this.addTodo}>
              Add
            </button>
          </form>
          <label id="filterBox">
            <input type="checkbox" checked={this.state.isFilter} onClick={this.filterDone} />
            <span>Show completed task</span>
          </label>
      
          <List  dense={true}>
            {this.state.todos.map((todo) => (
              <ListItem id="itemsList" key={todo.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={todo.isDone}
                    onChange={() => this.updateDone(todo)}
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
                    onClick={() => this.openUpdateDialog(todo)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => this.deleteTodo(todo.id)}
                  >
                    <DeleteOutlineRounded />
                  </IconButton>
              </ListItem>
            ))}
          </List>
      
          <Dialog id="DL" open={this.state.open} onClose={this.handleClose}>
            <DialogContent id="DLbox">
              <TextField id="DLbox_text"
                autoFocus
                margin="normal"
                label="Update Todo"
                type="text"
                fullWidth
                name="updateTodo"
                value={this.update}
                onChange={(event) => this.setUpdate(event.target.value)}
              />
            </DialogContent>
            <DialogActions id="DLactions">
              <Button onClick={this.handleClose} >
                Cancel
              </Button>
              <Button onClick={this.editTodo} color="primary">
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </div>
      )
}
  
    
  
}

export default Todo;
